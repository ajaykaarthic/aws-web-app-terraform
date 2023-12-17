variable "region" {
  description = "region to deploy the resource"
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "The name of cluster"
  type        = string
  default     = "my-web-app"
}

variable "cpu" {
  description = "cpu units used by the ecs service task"
  type        = number
  default     = 512
}

variable "memory" {
  description = "memory used by the ecs service task"
  type        = number
  default     = 1024
}

variable "os_family" {
  description = "task definition OS family"
  type        = string
  default     = "LINUX"
}

variable "cpu_architecture" {
  description = "cpu_architecture"
  type        = string
  default     = "X86_64"
}

variable "docker_image" {
  description = "docker image"
  type        = string
}

variable "container_port" {
  description = "docker containter port"
  type        = number
  default     = 3000
}

variable "host_port" {
  description = "docker host port"
  type        = number
  default     = 3000
}

variable "desired_count" {
  description = "No of instances of the task definition to place and keep running"
  type        = number
  default     = 1
}

