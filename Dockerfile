FROM node:16-slim

RUN apt-get update && apt-get -y install vim

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 4000

CMD [ "node", "index.js" ]