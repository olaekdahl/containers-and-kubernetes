FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm i --omit=dev
COPY app ./app
EXPOSE 3000
CMD ["npm","start"]
