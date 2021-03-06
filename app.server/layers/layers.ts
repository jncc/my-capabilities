
let turf = require("turf");

import { SCENES } from "./scenes";


class Query {
  bbox:  [number, number, number, number]
  start: Date
  end:   Date
  type:  "raw" | "ndwi" | "ndvi"
}


export function handleLayers(query: any) {

  let q = parseQuery(query);
  let boundingBox = turf.bboxPolygon(q.bbox);

  let results = SCENES
    .filter(s => turf.intersect(s.polygon, boundingBox))
    .filter(s => {
      let date = new Date(s.date);
      return date > q.start && date <= q.end;
    });

  return results;
}

function parseQuery(o: any): Query {

  let q = new Query();

  if (o.bbox) {
    // todo validate
    q.bbox = JSON.parse(o.bbox);
  }
  else {
    q.bbox = [-5, 53, 2, 57];
  }

  if (o.start) {
    let start = new Date(o.start);
    if (start) {
      q.start = start;
    }
  }
  else {
    q.start = new Date(2016, 4, 1);
  }

  if (o.end) {
    let end = new Date(o.end);
    if (end) {
      q.end = end;
    }
  }
  else {
    q.end = new Date(2016, 4, 3);
  }

  if (o.type) {
    // todo validate
    q.type = o.type;
  }
  else {
    o.type = "raw";
  }

  return q;
}

// let query: Query = {
//   bbox: [-5, 53, 2.021, 57],
//   start: new Date(),
//   end: new Date(),
//   type: 'raw'
// };

// let x: any = {};
// let result = handleLayers(x);
// console.log(result);

// let query = parseQuery({bbox: '[-5, 55, 2, 57]', type: 'raw', start: '2016-04-01', end: '2016-04-02'});
// console.log(query);
