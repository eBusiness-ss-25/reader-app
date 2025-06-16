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

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy the built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy both package.json and package-lock.json so that `npm ci` works
COPY package*.json ./

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
