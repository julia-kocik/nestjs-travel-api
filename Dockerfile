FROM node:18-alpine
EXPOSE 80
WORKDIR "/app"
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:prod"]
