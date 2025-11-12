output "service_url" {
  description = "Public URL for the Cloud Run service."
  value       = google_cloud_run_v2_service.app.uri
}

output "service_account_email" {
  description = "Runtime service account email."
  value       = google_service_account.runtime.email
}
