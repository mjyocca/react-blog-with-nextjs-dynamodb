FROM node:14

RUN mkdir /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . /usr/app

CMD ["./node_modules/.bin/ts-node", "./scripts/index.ts"]