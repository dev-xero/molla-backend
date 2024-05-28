FROM node:20.12.0-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "prod" ]
