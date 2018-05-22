FROM node:carbon

RUN mkdir -p /usr/src/hello-world-bc
WORKDIR /usr/src/hello-world-bc

COPY package.json ./

RUN cd /usr/src/hello-world-bc && npm install

COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]