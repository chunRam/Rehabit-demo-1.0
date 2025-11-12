output "load_balancer_dns_name" {
  description = "Public DNS name for the Application Load Balancer."
  value       = aws_lb.this.dns_name
}

output "service_security_group_id" {
  description = "Security group applied to the ECS service."
  value       = aws_security_group.service.id
}

output "task_definition_arn" {
  description = "ECS task definition ARN."
  value       = aws_ecs_task_definition.this.arn
}
