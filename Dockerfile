FROM node:16.3.0-alpine3.13 AS build
WORKDIR /usr/src/app
RUN apk add --no-cache curl
RUN curl -Lvik https://registry.npmjs.org/zone.js/-/zone.js-0.11.8.tgz --output zone.js.tgz
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine
RUN mkdir /nginx-config
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/redact-feed /usr/share/nginx/html
