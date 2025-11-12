# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./

FROM base AS deps
RUN npm install --only=production

FROM base AS devdeps
RUN npm install

FROM devdeps AS builder
COPY . .
RUN npm run build

FROM deps AS release-deps
RUN npm dedupe && npm prune --omit=dev

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=release-deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
COPY --from=builder /app/dist ./dist
EXPOSE 8081
CMD ["node", "./src/index.js"]
