provider "sentry" {
  auth_token = var.sentry_token
  organization = var.sentry_org
}

provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}

provider "slack" {
  token = var.slack_token
}

resource "sentry_team" "platform" {
  organization = var.sentry_org
  name         = var.sentry_team
}

resource "sentry_project" "rehabit" {
  organization = var.sentry_org
  team         = sentry_team.platform.slug
  name         = var.sentry_project
  platform     = "node-express"
}

resource "datadog_monitor" "latency" {
  name    = "Rehabit API latency"
  type    = "metric alert"
  query   = "avg(last_5m):avg:rehabit.api.latency{*} > ${var.latency_threshold_ms}"
  message = "High latency detected in Rehabit API. Notify @slack-${slack_conversation.alerts.id}"

  notify_audit = true
  include_tags = true

  thresholds {
    critical = var.latency_threshold_ms
  }

  tags = ["service:rehabit-api", "env:${var.environment}"]
}

resource "datadog_monitor" "errors" {
  name    = "Rehabit error rate"
  type    = "log alert"
  query   = "logs('service:rehabit-api status:error env:${var.environment}') >= 5"
  message = "Elevated error rate detected. Investigate recent releases. @slack-${slack_conversation.alerts.id}"

  monitor_thresholds {
    critical = 5
  }

  tags = ["service:rehabit-api", "env:${var.environment}"]
}

resource "slack_conversation" "alerts" {
  name = var.slack_channel
  is_private = false
}

resource "slack_conversation" "infra" {
  name = var.slack_infra_channel
  is_private = false
}

resource "slack_chat_schedule" "deployments" {
  conversation_id = slack_conversation.infra.id
  post_at         = var.deploy_notification_time
  text            = "Daily deployment window reminder for Rehabit platform."
}

resource "sentry_metric_alert" "error_rate" {
  organization = var.sentry_org
  project      = sentry_project.rehabit.slug
  name         = "High error rate"
  query        = "count():sum(myapp.transactions.errors){service:rehabit-api} >= ${var.error_rate_threshold}"
  aggregate    = "count()"
  time_window  = "5m"
  threshold_type = "above"
  trigger {
    threshold = var.error_rate_threshold
    label     = "critical"
  }
  actions {
    type   = "slack"
    target = slack_conversation.alerts.id
  }
}
