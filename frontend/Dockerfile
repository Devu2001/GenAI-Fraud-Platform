# Use Node.js for building
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Use a lighter runner image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
