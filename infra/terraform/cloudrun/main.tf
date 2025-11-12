provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_artifact_registry_repository" "containers" {
  project       = var.project_id
  location      = var.region
  repository_id = var.repository
  description   = "Container images built from Rehabit monorepo"
  format        = "DOCKER"
}

resource "google_service_account" "runtime" {
  project      = var.project_id
  account_id   = "${var.service_name}-runtime"
  display_name = "${var.service_name} Cloud Run runtime"
}

resource "google_project_iam_member" "artifact_puller" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = google_service_account.runtime.member
}

resource "google_cloud_run_v2_service" "app" {
  name     = var.service_name
  location = var.region

  template {
    service_account = google_service_account.runtime.email

    containers {
      image = var.container_image

      env {
        name  = "NODE_ENV"
        value = var.node_env
      }

      env {
        name  = "SENTRY_DSN"
        value = var.sentry_dsn
      }

      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

resource "google_cloud_run_service_iam_member" "invoker" {
  location = google_cloud_run_v2_service.app.location
  project  = var.project_id
  service  = google_cloud_run_v2_service.app.name
  role     = "roles/run.invoker"
  member   = var.invoker_identity
}
