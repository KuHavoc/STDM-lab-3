FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8001
CMD ["npm", "run", "start"]