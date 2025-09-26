# FROM node:22-alpine
# WORKDIR /app
# COPY package.json ./
# RUN npm i --omit=dev
# COPY app ./app
# EXPOSE 3000
# CMD ["npm","start"]

# Intentionally bad to trigger Hadolint
FROM node:alpine
ADD package.json ./
RUN apk add --update curl && npm i
ADD app ./app
EXPOSE 3000
CMD ["npm","start"]