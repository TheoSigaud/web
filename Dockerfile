FROM node:17-alpine
WORKDIR /app

COPY nuxt-app/package.json ./

RUN yarn
