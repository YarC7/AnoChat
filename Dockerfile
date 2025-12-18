# Multi-stage build for Next.js app

# --- Builder ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install build deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# --- Runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what we need for runtime
COPY package.json package-lock.json* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copy any server-side libs or scripts
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/app ./app
COPY --from=builder /app/db ./db
COPY --from=builder /app/drizzle.config.ts ./

EXPOSE 3000

# Entrypoint runs migrations then starts the app
CMD ["sh", "-c", "npx drizzle-kit push && npm run start -- -p 3000"]
