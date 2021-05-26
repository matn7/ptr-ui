FROM node:10
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm","run","start"]
EXPOSE 4200
