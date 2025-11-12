terraform {
  required_version = ">= 1.5.0"

  required_providers {
    sentry = {
      source  = "jianyuan/sentry"
      version = "~> 0.11"
    }
    datadog = {
      source  = "DataDog/datadog"
      version = "~> 3.35"
    }
    slack = {
      source  = "pablovarela/slack"
      version = "~> 1.0"
    }
  }
}
