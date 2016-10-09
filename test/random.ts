
/// <reference path="../node_modules/@types/node/index.d.ts" />
import * as turf from "turf";
import * as fs from 'fs';
import { scenes } from "./dev-scenes";

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

class Query {
  bbox:  [number]
  start: Date
  end:   Date
  type:  "raw" | "ndwi" | "ndvi"
}

function getResources(query: Query) {

  let northernBbox = turf.bboxPolygon([-5, 52, 2.021, 57]);

  let scene = {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -2.7086206565981197,
              54.84913198459255
            ],
            [
              -2.1916545497048885,
              53.90273033424668
            ],
            [
              -2.9092103548653947,
              53.6443964161533
            ],
            [
              -3.1764461149671095,
              52.5756011785084
            ],
            [
              -2.7086206565981197,
              54.84913198459255
            ]
          ]
        ]
      },
      "properties": {}
    };

var poly1 = {
  "type": "Feature",
  "properties": {
    "fill": "#0f0"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-122.801742, 45.48565],
      [-122.801742, 45.60491],
      [-122.584762, 45.60491],
      [-122.584762, 45.48565],
      [-122.801742, 45.48565]
    ]]
  }
};
    let northernScenes = turf.intersect(poly1, northernBbox);

  //let northernScenes = scenes.features.filter((f => turf.intersect(f as GeoJSON.Feature<GeoJSON.Polygon>, northernBbox)));

  //let output = JSON.stringify(northernScenes);
  //fs.writeFileSync(`delete.json`, output);

  return new Query();
}

getResources(new Query());
