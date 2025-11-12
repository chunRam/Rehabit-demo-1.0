# Cloud Run Stack

This Terraform stack provisions the Google Cloud resources required to run a Rehabit container image on Cloud Run.

## Features

- Creates an Artifact Registry repository for container storage.
- Manages a dedicated runtime service account with least-privilege access.
- Deploys a Cloud Run v2 service with configurable CPU, memory, and environment variables.
- Grants the configured invoker identity permission to reach the service endpoint.

## Usage

```hcl
module "rehabit_api" {
  source = "./infra/terraform/cloudrun"

  project_id      = "rehabit-prod"
  region          = "us-central1"
  repository      = "rehabit"
  service_name    = "rehabit-api"
  container_image = "us-central1-docker.pkg.dev/rehabit-prod/rehabit/api:latest"
  sentry_dsn      = var.sentry_dsn
  invoker_identity = "serviceAccount:rehabit-gateway@rehabit-prod.iam.gserviceaccount.com"
}
```

Use a remote backend (e.g., Google Cloud Storage) for state management in production environments.
