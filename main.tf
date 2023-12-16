provider "aws" {
  region = "us-east-1"
}

variable "server_port" {
  description = "Port the server will use for the HTTP requests"
  type        = number
  default     = 80
}

#####################################################
############### VPC and SUBNETS #####################
#####################################################
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}


#####################################################
############### SECURITY GROUPS #####################
#####################################################
resource "aws_security_group" "instance" {

  name = "terraform-example-instance"
  ingress {
    from_port   = var.server_port
    to_port     = var.server_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "alb" {
  name = "terraform-example-alb"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_service" {
  name = "ecs-service-sg"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_launch_configuration" "example" {
  image_id        = "ami-0759f51a90924c166"
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.instance.id]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p ${var.server_port} &
              EOF
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_target_group" "asg" {
  name        = "terraform-asg-example"
  port        = 80
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

# resource "aws_autoscaling_group" "example" {
#   launch_configuration = aws_launch_configuration.example.name
#   vpc_zone_identifier  = data.aws_subnets.default.ids

#   target_group_arns = [aws_lb_target_group.asg.arn]
#   health_check_type = "ELB"

#   min_size = 1
#   max_size = 2

#   tag {
#     key                 = "Name"
#     value               = "terraform-asg-example"
#     propagate_at_launch = true
#   }
# }

resource "aws_lb" "example" {
  name               = "terraform-asg-example"
  load_balancer_type = "application"
  subnets            = data.aws_subnets.default.ids
  security_groups    = [aws_security_group.alb.id]
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.example.arn
  port              = 80
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

#ECS
resource "aws_ecs_cluster" "cluster" {
  name = "my-web-app"
}

resource "aws_ecs_task_definition" "task_definition" {
  family                   = "my-web-app"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512" #0.5vCPU
  memory                   = "1024" #1GB
  network_mode             = "awsvpc"
  skip_destroy             = true
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  execution_role_arn = "arn:aws:iam::617981262533:role/ecsTaskExecutionRole"
  task_role_arn      = "arn:aws:iam::617981262533:role/ecsTaskExecutionRole"

  container_definitions = jsonencode([{
    name  = "my-web-app-container"
    image = "617981262533.dkr.ecr.us-east-1.amazonaws.com/jenkins-pipeline-my-web-app:latest"
    portMappings = [
      {
        containerPort = 3000
        hostPort      = 3000
        protocol = "tcp"
        appProtocol = "http"
      }
    ],
    logConfiguration = {
      logDriver = "awslogs",
      options = {
        "awslogs-create-group"= "true"
        "awslogs-group"         = "/ecs/my-web-app"
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_cloudwatch_log_group" "my_log_group" {
  name = "/ecs/my-web-app"
}

resource "aws_ecs_service" "ecs" {
  name            = "my-web-app"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  load_balancer {
    target_group_arn = aws_lb_target_group.asg.arn
    container_name   = "my-web-app-container"
    container_port   = 3000
  }
  network_configuration {
    subnets         = data.aws_subnets.default.ids
    security_groups = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }

}

output "alb_dns_name" {
  value       = aws_lb.example.dns_name
  description = "The domain name of the load balancer"
}