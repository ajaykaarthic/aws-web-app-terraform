provider "aws" {
  region = var.region
  
  # Tags to apply to all AWS resources by default
  default_tags {
    tags = {
      Owner     = "ajaykaarthic"
      ManagedBy = "Terraform"
    }
  }
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

locals {
  http_port     = 80
  any_port      = 0
  any_protocol  = "-1"
  tcp_protocol  = "tcp"
  http_protocol = "http"
  all_ips       = ["0.0.0.0/0"]
}

resource "aws_security_group" "alb" {
  name = "${var.cluster_name}-alb"
}

resource "aws_security_group_rule" "allow_http_inbound_alb" {
  type              = "ingress"
  security_group_id = aws_security_group.alb.id

  from_port   = local.http_port
  to_port     = local.http_port
  protocol    = local.tcp_protocol
  cidr_blocks = local.all_ips
}

resource "aws_security_group_rule" "allow_all_outbound_alb" {
  type              = "egress"
  security_group_id = aws_security_group.alb.id

  from_port   = local.any_port
  to_port     = local.any_port
  protocol    = local.any_protocol
  cidr_blocks = local.all_ips
}


resource "aws_security_group" "ecs_service" {
  name = "${var.cluster_name}-ecs-service"
}

resource "aws_security_group_rule" "allow_all_inbound_ecs" {
  type              = "ingress"
  security_group_id = aws_security_group.ecs_service.id
  from_port         = local.any_port
  to_port           = local.any_port
  protocol          = local.any_protocol
  cidr_blocks       = local.all_ips
}

resource "aws_security_group_rule" "allow_all_outbound_ecs" {
  type              = "egress"
  security_group_id = aws_security_group.ecs_service.id
  from_port         = local.any_port
  to_port           = local.any_port
  protocol          = local.any_protocol
  cidr_blocks       = local.all_ips
}

resource "aws_lb_target_group" "asg" {
  name        = "${var.cluster_name}-asg"
  port        = local.http_port
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.default.id
  target_type = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 15
    timeout             = 3
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb" "load_balancer" {
  name               = var.cluster_name
  load_balancer_type = "application"
  subnets            = data.aws_subnets.default.ids
  security_groups    = [aws_security_group.alb.id]
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = local.http_port
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "404: page not found"
      status_code  = 404
    }
  }
}

resource "aws_lb_listener_rule" "asg" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 100

  condition {
    path_pattern {
      values = ["*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.asg.arn
  }

}

resource "aws_ecs_cluster" "cluster" {
  name = var.cluster_name
}

resource "aws_ecs_task_definition" "task_definition" {
  family                   = var.cluster_name
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory
  network_mode             = "awsvpc"
  runtime_platform {
    operating_system_family = var.os_family
    cpu_architecture        = var.cpu_architecture
  }
  execution_role_arn = "arn:aws:iam::617981262533:role/ecsTaskExecutionRole"
  task_role_arn      = "arn:aws:iam::617981262533:role/ecsTaskExecutionRole"

  container_definitions = jsonencode([{
    name  = "${var.cluster_name}-container"
    image = var.docker_image
    portMappings = [
      {
        containerPort = var.container_port
        hostPort      = var.host_port
        protocol      = local.tcp_protocol
        appProtocol   = local.http_protocol
      }
    ],
    logConfiguration = {
      logDriver = "awslogs",
      options = {
        "awslogs-create-group"  = "true"
        "awslogs-group"         = "/ecs/${var.cluster_name}"
        "awslogs-region"        = var.region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_cloudwatch_log_group" "my_log_group" {
  name = "/ecs/${var.cluster_name}"
}

resource "aws_ecs_service" "ecs" {
  name            = var.cluster_name
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task_definition.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"
  load_balancer {
    target_group_arn = aws_lb_target_group.asg.arn
    container_name   = "${var.cluster_name}-container"
    container_port   = var.container_port
  }
  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }
}