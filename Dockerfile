# Delegate.ai — runtime-only Docker image (pre-built locally)
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=10000
ENV HOSTNAME=0.0.0.0

# Copy the entire pre-built standalone directory
COPY .next/standalone ./

EXPOSE 10000
CMD ["node", "server.js"]
