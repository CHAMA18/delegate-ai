# ---- Build stage ----
# Delegate.ai — production Docker image for Render free tier (512MB limit)
# Based on the proven PatikaGo Dockerfile pattern
FROM node:20-alpine AS builder
WORKDIR /app

# Install bun (for lockfile parsing) and copy package files
RUN npm install -g bun
COPY package.json bun.lock ./

# Generate package-lock.json from bun.lock, then install with npm
RUN bun install --frozen-lockfile --production=false

# Copy source
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build with webpack (Turbopack OOMs on Render free tier's 512MB limit)
# Cap Node heap at 1.5GB to stay within Render's build memory limit
RUN NODE_OPTIONS="--max-old-space-size=1536" npx next build --webpack && \
    cp -r .next/static .next/standalone/.next/ && \
    cp -r public .next/standalone/

# ---- Runtime stage (minimal image) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=10000
ENV HOSTNAME=0.0.0.0

# Copy standalone server, static assets, and public folder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/standalone/.next/static ./.next/static
COPY --from=builder /app/.next/standalone/public ./public

EXPOSE 10000
CMD ["node", "server.js"]
