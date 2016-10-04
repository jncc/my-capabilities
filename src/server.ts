// import { layers } from "./layers-demo-config";

import * as express from "express";

const PORT = 8899;

let app = express();

app.get(`/`, (request, response) => {
  response.set(`Content-Type`, `text/xml`);
  response.send(`<root><request>${request.url}</request></root>`);
});

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
