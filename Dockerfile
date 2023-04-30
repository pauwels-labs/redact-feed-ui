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

RUN apk --no-cache add shadow && usermod -u 1000 nginx && groupmod -g 1000 nginx && apk del shadow
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown -R nginx:nginx /etc/nginx/nginx.conf && \
    chown -R nginx:nginx /nginx-config
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
