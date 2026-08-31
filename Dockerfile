# ---- Build stage ----
# Delegate.ai — production Docker image for Render free tier (512MB limit)
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies — allow scripts (firebase needs them)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy source
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build with webpack, skip lint, increased heap for Firebase SDK
RUN NODE_OPTIONS="--max-old-space-size=2048" npx next build --webpack --no-lint && \
    cp -r .next/static .next/standalone/.next/ && \
    cp -r public .next/standalone/

# ---- Runtime stage (minimal image) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=10000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/standalone/.next/static ./.next/static
COPY --from=builder /app/.next/standalone/public ./public

EXPOSE 10000
CMD ["node", "server.js"]
