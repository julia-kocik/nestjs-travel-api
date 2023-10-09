FROM node:18-alpine as builder
EXPOSE 80
WORKDIR "/app"
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "prod"]
