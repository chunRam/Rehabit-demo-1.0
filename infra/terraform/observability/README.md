# Observability Stack

This Terraform stack provisions cross-cutting monitoring, logging, and alerting integrations for Rehabit.

## Components

- **Sentry** project and metric alert for capturing API exceptions.
- **Datadog** monitors for latency and error rates sourced from metrics/logs emitted by the services.
- **Slack** channels and scheduled reminders to keep the on-call team informed.

## Getting Started

```hcl
module "observability" {
  source = "./infra/terraform/observability"

  environment          = "staging"
  sentry_org           = "rehabit"
  sentry_token         = var.sentry_token
  datadog_api_key      = var.datadog_api_key
  datadog_app_key      = var.datadog_app_key
  slack_token          = var.slack_token
  latency_threshold_ms = 600
}
```

All secrets should be provided via secure variable injection (Terraform Cloud, environment variables, or encrypted CI/CD secrets).
