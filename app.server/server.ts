
import * as express from "express";

import { layers } from "./demo";
import { getCapabilities } from "./capabilities";

const PORT = 80;

let app = express();


app.get(`/xml`, (request, response) => {
  response.set(`Content-Type`, `text/xml`);
  let xml = getCapabilities(layers);
  response.send(xml);
});

app.use(express.static(''));

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
