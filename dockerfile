
FROM node:4
RUN apt-get update && apt-get install -y nodejs npm
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 80
ENTRYPOINT ["nodejs", "/app/dist/server.js"]
