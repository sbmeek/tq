FROM node:lts

WORKDIR /usr/src/app

ENV DOCKERIZED_DB_URI mongodb://db:localhost/tq

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2017

CMD ["npm","run","dev"]
