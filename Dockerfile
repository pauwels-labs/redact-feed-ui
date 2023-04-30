FROM node:18.16.0-alpine3.17 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY src src
COPY angular.json .browserslistrc karma.conf.js nginx.conf tsconfig.app.json tsconfig.json tsconfig.spec.json .
RUN npm run build

FROM nginx:1.21.0-alpine
RUN mkdir /nginx-config
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/redact-feed /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]