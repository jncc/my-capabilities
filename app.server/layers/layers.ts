
import * as turf from "turf";

import { Query } from "../../app.shared/Query"
import { SCENES } from "./scenes";

export function handleLayers(query: Query) {

  // temporary til model binding works
  query.bbox = [-5, 53, 2.021, 57];

  let boundingBox = turf.bboxPolygon(query.bbox);

  let results = SCENES
    .filter(s => turf.intersect(s.polygon, boundingBox));

  return results;
}



// let query: Query = {
//   bbox: [-5, 53, 2.021, 57],
//   start: new Date(),
//   end: new Date(),
//   type: 'raw'
// };

// let result = handleLayers(query);
// console.log(result);

