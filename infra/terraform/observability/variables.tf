variable "environment" {
  description = "Deployment environment label."
  type        = string
}

variable "sentry_token" {
  description = "Sentry API token."
  type        = string
  sensitive   = true
}

variable "sentry_org" {
  description = "Sentry organization slug."
  type        = string
}

variable "sentry_team" {
  description = "Team that owns Rehabit projects."
  type        = string
  default     = "platform"
}

variable "sentry_project" {
  description = "Sentry project name."
  type        = string
  default     = "rehabit-api"
}

variable "datadog_api_key" {
  description = "Datadog API key."
  type        = string
  sensitive   = true
}

variable "datadog_app_key" {
  description = "Datadog application key."
  type        = string
  sensitive   = true
}

variable "latency_threshold_ms" {
  description = "Critical latency threshold in milliseconds."
  type        = number
  default     = 500
}

variable "error_rate_threshold" {
  description = "Critical error count threshold for Sentry alerts."
  type        = number
  default     = 10
}

variable "slack_token" {
  description = "Slack bot token for automation."
  type        = string
  sensitive   = true
}

variable "slack_channel" {
  description = "Slack channel for production alerts."
  type        = string
  default     = "rehabit-alerts"
}

variable "slack_infra_channel" {
  description = "Slack channel for infrastructure updates."
  type        = string
  default     = "rehabit-infra"
}

variable "deploy_notification_time" {
  description = "UNIX timestamp for the next deployment reminder."
  type        = string
  default     = "1704067200"
}
