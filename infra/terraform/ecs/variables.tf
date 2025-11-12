variable "region" {
  description = "AWS region for ECS resources."
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment label (dev, staging, prod)."
  type        = string
}

variable "service_name" {
  description = "Logical name of the service to deploy."
  type        = string
}

variable "container_image" {
  description = "Container image to deploy."
  type        = string
}

variable "container_port" {
  description = "Container port exposed by the service."
  type        = number
  default     = 3000
}

variable "desired_count" {
  description = "Desired number of ECS tasks."
  type        = number
  default     = 2
}

variable "task_cpu" {
  description = "Fargate CPU units for the task definition."
  type        = string
  default     = "512"
}

variable "task_memory" {
  description = "Fargate memory for the task definition."
  type        = string
  default     = "1024"
}

variable "node_env" {
  description = "NODE_ENV value forwarded to the container."
  type        = string
  default     = "production"
}

variable "sentry_dsn" {
  description = "Sentry DSN forwarded to the container."
  type        = string
  default     = ""
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days."
  type        = number
  default     = 30
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.20.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets."
  type        = list(string)
  default     = ["10.20.1.0/24", "10.20.2.0/24"]
}

variable "availability_zones" {
  description = "Availability zones to spread subnets across."
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "health_check_path" {
  description = "HTTP path for load balancer health checks."
  type        = string
  default     = "/healthz"
}
