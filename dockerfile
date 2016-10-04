
FROM node:4

RUN apt-get update && apt-get install -y nodejs npm

COPY . /app
RUN cd /app && npm install && npm run build

EXPOSE 80

CMD ["nodejs", "/app/dist/server.js"]
