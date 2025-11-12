# Infra-as-Code Layout

This directory collects Terraform stacks for Rehabit's deployment targets and shared services.

- `terraform/cloudrun` provisions Google Cloud Run services backed by container images published from GitHub Actions.
- `terraform/ecs` provisions an AWS ECS Fargate environment for long-running services.
- `terraform/observability` wires Sentry, Datadog, and Slack alerting to provide a cohesive monitoring surface.

Each stack ships with opinionated defaults, remote state examples, and variable inputs so platform teams can tailor the infrastructure per environment (development, staging, production).
