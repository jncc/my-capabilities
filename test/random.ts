
/// <reference path="../node_modules/@types/node/index.d.ts" />
import * as turf from "turf";
import * as fs from 'fs';


function generateRandomScenePolygons() {

  // uk bounding box is [-10.854, 49.823, 2.021, 59.478]
  // but let's manually shrink it slightly (still covers england, wales and most of scotland)
  let bbox = [-5, 49.823, 2.021, 57]

  // use http://turfjs.org/docs/#random to generate some overlapping shapes
  // that are usable as dev / test sentinel scene shapes
  let polygons = turf.random('polygons', 100, {
    bbox: bbox,
    num_vertices: 4, // shapes have up to four sides
    max_radial_length: 1.5 // this is about the right size
  });

  let output = JSON.stringify(polygons);
  fs.writeFileSync(`delete.json`, output);
};

