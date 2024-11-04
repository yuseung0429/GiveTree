FROM node:18-alpine AS build

WORKDIR /app/fe

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build

CMD ["yarn", "start"]
