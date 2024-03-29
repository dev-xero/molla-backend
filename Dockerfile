FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY key.json /usr/src/app/key.json

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
