FROM node:18-alpine
WORKDIR /goatbeat-server
COPY . .
RUN yarn install --production
CMD ["node", "src/main.js"]
EXPOSE 3000