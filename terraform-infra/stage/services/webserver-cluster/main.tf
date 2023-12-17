module "webserver_cluster" {
  source         = "../../../modules/services/webserver-cluster"
  region         = "us-east-1"
  cluster_name   = "my-web-app"
  docker_image   = "617981262533.dkr.ecr.us-east-1.amazonaws.com/jenkins-pipeline-my-web-app:latest"
  container_port = 3000
  host_port      = 3000
  cpu            = 512
  memory         = 1024
  desired_count  = 1
}