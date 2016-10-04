// import { layers } from "./layers-demo-config";

import * as express from "express";

const PORT = 8899;

let app = express();

app.get("/", (request, response) => {
  response.send('It works! Path: ' + request.url);
});

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:%s", PORT);
});


// console.log(layers);
