FROM node:lts
FROM cypress/base:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN CI=true
RUN npm i cypress
RUN npx cypress open
RUN npm i
RUN npm config set proxy http://localhost:2017/

COPY . .

EXPOSE 3000

CMD ["npm","start"]
