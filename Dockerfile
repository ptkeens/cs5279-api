FROM node:16
RUN apt-get update && apt-get install -y vim
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./
RUN npm ci
COPY . ./