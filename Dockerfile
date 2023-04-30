FROM node:16.3.0-alpine3.13 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine
RUN mkdir /nginx-config
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/redact-feed /usr/share/nginx/html
