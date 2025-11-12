# Rehabit demo 1.0

Backend API built with [NestJS](https://nestjs.com/) that demonstrates a habit tracking domain with authentication, PostgreSQL persistence, and integration points for a future FastAPI powered emotion analysis service.

## Requirements

- Node.js 18+
- PostgreSQL 13+

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables (optional – defaults are provided):

   ```bash
   export DB_HOST=localhost
   export DB_PORT=5432
   export DB_USERNAME=postgres
   export DB_PASSWORD=postgres
   export DB_NAME=rehabit
   export JWT_SECRET=super-secret-key
   export JWT_EXPIRES_IN=1d
   export EMOTION_API_URL=http://localhost:8000/analyze
   ```

3. Run database migrations

   ```bash
   npm run build:mobile
   npm run test:integration
   npm run test:api
   npm run test:ml
   npm run test:mobile
   npm run lint
   npm run format
   ```

4. Start the development server

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000` with interactive docs at `http://localhost:3000/docs`.

## Available scripts

- `npm run start` – start the compiled application
- `npm run start:dev` – run with hot reload via `ts-node-dev`
- `npm run build` – compile TypeScript to JavaScript
- `npm run migration:generate` – scaffold a new TypeORM migration
- `npm run migration:run` / `npm run migration:revert` – apply or rollback migrations
- `npm test` – execute Jest unit tests
- `npm run lint` – run ESLint

## Project structure

```
src/
├── app.module.ts              # Root module wiring configuration
├── main.ts                    # Bootstrap entry point (enables Swagger)
├── auth/                      # Authentication module, controllers and services
├── users/                     # User entity, service, and controller
├── habits/                    # Habit CRUD module and DTOs
├── emotion/                   # HTTP client for emotion analysis
├── common/                    # Shared guards and decorators
└── database/migrations/       # TypeORM migrations
```
apps/
  mobile/  # React Native placeholder project
  api/     # Minimal Node.js API service
  ml/      # Machine learning utilities
docs/      # QA 체크리스트, 테스트 데이터 시드 등 가이드 문서
.github/workflows/  # CI pipelines for each project
```

## Emotion analysis integration

`EmotionService` (exposed via `EmotionModule`) wraps the Nest `HttpModule` to call the FastAPI service configured by `EMOTION_API_URL`. Responses are optional (`null` is returned on HTTP errors) so downstream consumers can gracefully handle unavailable analytics.
