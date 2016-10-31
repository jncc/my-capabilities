
import * as express from "express";

import { getEnvironmentSettings } from "./settings";
import { layers } from "./demo";
import { getCapabilities } from "./capabilities";

let app = express();
let env = getEnvironmentSettings(app.settings.env);

// handle http data requests
app.get(`/xml`, (request, response) => {
  response.set(`Content-Type`, `text/xml`);
  let xml = getCapabilities(layers);
  response.send(xml);
});

// serve static files from the following directory
app.use(express.static(env.dir));

// start the express web server
app.listen(env.port, () => {
    console.log(`app.server listening on: http://localhost:${env.port}`);
    console.log(`node environment is ${env.name}`);
});


