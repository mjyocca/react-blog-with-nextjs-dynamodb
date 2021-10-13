FROM node:14

RUN mkdir /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . /usr/app

EXPOSE 3000

CMD ["npm", "run", "dev"]