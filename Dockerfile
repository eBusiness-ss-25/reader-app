# Use Node 22 on Alpine as the base image
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install libc6-compat to support older packages
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image with Node.js and serve
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install serve globally
RUN npm install -g serve

# Copy the static export from the builder stage
COPY --from=builder /app/out ./out

EXPOSE 3000
CMD ["serve", "-s", "out", "-l", "3000"]
