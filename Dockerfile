FROM node:alpine3.11

EXPOSE 3001
WORKDIR /app

COPY ./package*.json .
RUN yarn install

COPY . .

CMD ["node", "index"]