# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./

FROM base AS deps
RUN npm install --only=production

FROM base AS devdeps
RUN npm install

FROM devdeps AS test
COPY src ./src
RUN npm test

FROM deps AS release-deps
# Ensure production dependency tree is clean
RUN npm dedupe && npm prune --omit=dev

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=release-deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
EXPOSE 3000
CMD ["node", "./src/server.js"]
