FROM node:18 

WORKDIR /usr/src/app

COPY ./app .
RUN npm install

EXPOSE 8080

CMD [ "node", "index.js" ]