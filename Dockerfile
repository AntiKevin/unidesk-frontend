# Dockerfile
# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm ci

# Copia código e build
COPY . .
RUN npm run build

# Etapa final de runtime
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copia artefatos de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "start"]
