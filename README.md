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
   npm run migration:run
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

## API overview

- `POST /auth/register` – create a new account
- `POST /auth/login` – obtain a JWT access token
- `GET /users/me` – retrieve the authenticated user profile
- `POST /habits` – create a habit for the authenticated user
- `GET /habits` – list habits for the authenticated user
- `GET /habits/:id` – retrieve a specific habit
- `PATCH /habits/:id` – update a habit
- `DELETE /habits/:id` – delete a habit
- `POST /habits/:id/analyze` – submit free text for emotion analysis (delegated to FastAPI service)

All habit and profile endpoints require a Bearer token obtained via the auth endpoints.

## Testing

Run unit tests with:

```bash
npm test
```

## Emotion analysis integration

`EmotionService` (exposed via `EmotionModule`) wraps the Nest `HttpModule` to call the FastAPI service configured by `EMOTION_API_URL`. Responses are optional (`null` is returned on HTTP errors) so downstream consumers can gracefully handle unavailable analytics.
