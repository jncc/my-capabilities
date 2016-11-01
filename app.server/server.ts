
import * as express from "express";

import { getEnvironmentSettings } from "./settings";
import { layers } from "./capabilities/demo";
import { getCapabilities } from "./capabilities/capabilities";
import { handleLayers } from "./layers/layers";

let app = express();
let env = getEnvironmentSettings(app.settings.env);

// serve static files from the following directory
app.use(express.static(env.dir));

// start the express web server
app.listen(env.port, () => {
  console.log(`app.server listening on: http://localhost:${env.port}`);
  console.log(`node environment is ${env.name}`);
});

// handle http data requests

app.get(`/capabilities`, (req, res) => {
  let result = getCapabilities(layers);
  res.set(`Content-Type`, `text/xml`);
  res.send(result);
});

app.get(`/layers`, (req, res) => {
  let result = handleLayers(req.query);
  res.json(result);
});

