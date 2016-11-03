
let turf = require("turf");

function spike() {

  let northernBbox = turf.bboxPolygon([-5, 52, 2.021, 57]);

  var outside = {
    "type": "Feature",
    "properties": {},
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
  } as GeoJSON.Feature<GeoJSON.Polygon>;


  let inside = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [-2.9992675781249996, 54.85131525968606],
          [-2.9992675781249996, 55.15376626853556],
          [-2.120361328125, 55.15376626853556],
          [-2.120361328125, 54.85131525968606],
          [-2.9992675781249996, 54.85131525968606]
        ]
      ]
    }
  } as GeoJSON.Feature<GeoJSON.Polygon>;

  let fails = turf.intersect(outside, northernBbox);
  console.log(fails);

  let succeeds = turf.intersect(inside, northernBbox);
  console.log(succeeds);
}

spike();
