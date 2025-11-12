variable "project_id" {
  description = "Google Cloud project hosting the Cloud Run service."
  type        = string
}

variable "region" {
  description = "Google Cloud region for Cloud Run."
  type        = string
  default     = "us-central1"
}

variable "repository" {
  description = "Artifact Registry repository name for container images."
  type        = string
  default     = "rehabit"
}

variable "service_name" {
  description = "Cloud Run service name."
  type        = string
}

variable "container_image" {
  description = "Full container image reference (including tag)."
  type        = string
}

variable "invoker_identity" {
  description = "Identity (user, service account, or group) allowed to invoke the service."
  type        = string
  default     = "allUsers"
}

variable "node_env" {
  description = "NODE_ENV value injected into the service."
  type        = string
  default     = "production"
}

variable "sentry_dsn" {
  description = "Sentry DSN forwarded to the runtime."
  type        = string
  default     = ""
}

variable "cpu_limit" {
  description = "CPU limit for the container."
  type        = string
  default     = "1"
}

variable "memory_limit" {
  description = "Memory limit for the container."
  type        = string
  default     = "512Mi"
}
