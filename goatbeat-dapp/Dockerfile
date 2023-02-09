#stage 1
FROM node:18-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN node_modules/.bin/ng build

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/goatbeat /usr/share/nginx/html
EXPOSE 80
