# ECS Fargate Stack

This Terraform configuration deploys Rehabit services on AWS ECS Fargate behind an Application Load Balancer.

## What you get

- A dedicated VPC with public subnets and internet connectivity.
- An ECS cluster and Fargate service wired to CloudWatch Logs.
- A reusable task definition with pluggable container images and environment variables.
- A public Application Load Balancer configured with health checks.

## Example

```hcl
module "rehabit_api" {
  source = "./infra/terraform/ecs"

  environment      = "prod"
  region           = "us-east-1"
  service_name     = "api"
  container_image  = "ghcr.io/rehabit/rehabit-api:latest"
  container_port   = 3000
  health_check_path = "/healthz"
  sentry_dsn       = var.sentry_dsn
}
```

Override the default networking variables when integrating with an existing VPC.
