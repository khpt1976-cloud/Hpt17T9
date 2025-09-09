# Multi-stage build for Botpress V12
FROM node:16-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /botpress

# Copy package files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /botpress
COPY --from=deps /botpress/node_modules ./node_modules
COPY . .

# Build Botpress
RUN yarn build --prod

# Production stage
FROM base AS runner
WORKDIR /botpress

ENV NODE_ENV=production
ENV BP_HOST=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 botpress
RUN adduser --system --uid 1001 botpress

# Copy built application
COPY --from=builder --chown=botpress:botpress /botpress/dist ./dist
COPY --from=builder --chown=botpress:botpress /botpress/out ./out
COPY --from=builder --chown=botpress:botpress /botpress/package.json ./package.json
COPY --from=builder --chown=botpress:botpress /botpress/node_modules ./node_modules

USER botpress

EXPOSE 3000

# Environment variables for Docker networking
ENV EXTERNAL_URL="http://localhost:12001"
ENV DUAN_HPT_URL="http://duan_hpt:3000"

CMD ["node", "./out/bp/index.js"]
