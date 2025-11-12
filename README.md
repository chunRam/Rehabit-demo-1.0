# Rehabit Monorepo

This repository hosts the Rehabit mobile, API, and machine learning applications inside a single JavaScript/Node.js monorepo. The setup uses npm workspaces to manage shared tooling and dependencies.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.sample` to `.env` and fill in environment-specific values.
3. Use the provided scripts to work with each package:
   ```bash
   npm run build:mobile
   npm run test:integration
   npm run test:api
   npm run test:ml
   npm run test:mobile
   npm run lint
   npm run format
   ```

## Repository layout

```
apps/
  mobile/  # React Native placeholder project
  api/     # Minimal Node.js API service
  ml/      # Machine learning utilities
docs/      # QA 체크리스트, 테스트 데이터 시드 등 가이드 문서
.github/workflows/  # CI pipelines for each project
```

## Shared tooling

* **ESLint** and **Prettier** configurations live at the repository root and apply to every workspace.
* `.env.sample` documents the environment variables required by each project.
* `docs/secret-management.md` outlines the secret handling strategy for local, CI, and production environments.
