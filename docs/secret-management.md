# Secret Management

This repository stores **no sensitive secrets**. Use the `.env.sample` file as a reference for the values that each application expects and create environment-specific `.env` files during deployment.

## Local development

1. Duplicate `.env.sample` to `.env` at the repository root.
2. Fill in the secret values that are required for your workflow (API tokens, database credentials, etc.).
3. Never commit `.env` files or other secret values to the repository. Add them to your shell environment or to a local secret manager instead.

## CI/CD

* Store secrets in GitHub Actions by navigating to **Settings → Secrets and variables → Actions** and creating repository or environment secrets.
* Reference those secrets inside workflow files using `${{ secrets.MY_SECRET_NAME }}`. Avoid printing secret values in workflow logs.

## Production

* Prefer an external secret management system (AWS Secrets Manager, Google Secret Manager, HashiCorp Vault, etc.) for long-term storage.
* Rotate keys regularly and revoke secrets from unused environments.
* Audit access to the secret manager to ensure least-privilege access.
