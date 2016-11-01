
import * as turf from "turf";

import { Query } from "../../app.shared/Query"
import { SCENES } from "./scenes";

export function layers(query: Query): any {

  let boundingBox = turf.bboxPolygon(query.bbox);

  let results = SCENES
    .filter(s => turf.intersect(s.polygon, boundingBox));

  return results.length;
}

let query: Query = {
  bbox: [-5, 53, 2.021, 57],
  start: new Date(),
  end: new Date(),
  type: 'raw'
};

let result = layers(query);
console.log(result);

