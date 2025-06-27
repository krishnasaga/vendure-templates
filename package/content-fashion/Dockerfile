# Simple Node.js Dockerfile for Vendure Content Package
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --production || yarn install --production

CMD ["npm", "start"]
