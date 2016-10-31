
FROM node:4
RUN apt-get update && apt-get install -y nodejs npm
# make more efficient by just copying what we need? maybe package.json and built output?
ENV NODE_ENV production
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 80
ENTRYPOINT ["nodejs", "/app/built/app.server/server.js"]
