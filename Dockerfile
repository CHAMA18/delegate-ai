# Delegate.ai — runtime-only Docker image (pre-built locally)
# Avoids Render free tier OOM during next build with Firebase SDK
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=10000
ENV HOSTNAME=0.0.0.0

# Copy pre-built standalone output
COPY .next/standalone ./
COPY .next/standalone/.next/static ./.next/static
COPY .next/standalone/public ./public

EXPOSE 10000
CMD ["node", "server.js"]
