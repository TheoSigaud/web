FROM node:18-alpine
WORKDIR /app

COPY nuxt-app/package.json ./

RUN yarn
