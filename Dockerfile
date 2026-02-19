# ==========================================
# Stage 1: Install dependencies
# ==========================================
FROM node:22-slim AS deps

WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for the build)
RUN npm ci

# ==========================================
# Stage 2: Build the Next.js application
# ==========================================
FROM node:22-slim AS builder

WORKDIR /app

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

# Build the Next.js application
# Next.js collects anonymous telemetry — disable it during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ==========================================
# Stage 3: Production runner (minimal image)
# ==========================================
FROM node:22-slim AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy the public assets
COPY --from=builder /app/public ./public

# Copy the standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Set hostname to listen on all interfaces
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Start the Next.js standalone server
CMD ["node", "server.js"]
