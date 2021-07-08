FROM node:14.17.2-stretch-slim
RUN yarn global add eslint

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
