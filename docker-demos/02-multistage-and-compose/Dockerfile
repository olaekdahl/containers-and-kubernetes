# -------- deps layer
FROM node:22-alpine AS deps
WORKDIR /src
COPY package*.json ./
RUN npm i --omit=dev

# -------- build layer (no transpile here, but keeps pattern clean)
FROM node:22-alpine AS build
WORKDIR /src
COPY --from=deps /src/node_modules ./node_modules
COPY package*.json ./
COPY app ./app

# -------- runtime (distroless)
FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/package*.json ./
COPY --from=build /src/app ./app
EXPOSE 3000
# Distroless node image has 'node' as entrypoint; this becomes its arg
CMD ["app/server.js"]
