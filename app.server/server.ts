
import * as express from "express";
import { layers } from "./demo";
import { getCapabilities } from "./capabilities";

let app = express();
let env = app.settings.env;
let port = env === 'development' ? 5000 : 80;

app.get(`/xml`, (request, response) => {
  response.set(`Content-Type`, `text/xml`);
  let xml = getCapabilities(layers);
  response.send(xml);
});

// serve static files from the following directory
app.use(express.static('app.client'));

// start the express web server
app.listen(port, () => {
    console.log(`app.server listening on: http://localhost:${port}`);
    console.log(`node environment is ${env}`);
});
