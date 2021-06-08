FROM node:16.3-stretch-slim
RUN yarn global add eslint

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install