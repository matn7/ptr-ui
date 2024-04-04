FROM node:21.2.0-slim

WORKDIR "/app"

COPY ./package.json ./

RUN npm install

COPY . /app

CMD ["npm","start"]
