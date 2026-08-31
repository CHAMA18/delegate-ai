# Delegate.ai — runtime-only Docker image (pre-built locally to avoid Render OOM)
# The .next/standalone directory is built locally and committed to the repo
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=10000
ENV HOSTNAME=0.0.0.0

# Copy pre-built standalone server, static assets, and public folder
COPY .next/standalone ./
COPY .next/standalone/.next/static ./.next/static
COPY .next/standalone/public ./public

EXPOSE 10000
CMD ["node", "server.js"]
