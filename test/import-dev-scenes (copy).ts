
/// <reference path="../node_modules/@types/node/index.d.ts" />

var csv = require('csv-parser')
import * as fs from 'fs';

let scenes = new Array();

fs.createReadStream('test/scenes.csv')
  .pipe(csv({ quote: '"' }))
  .on('data', data => {
    console.log(`Reading '${data.title}'`);
    scenes.push({
      name: data.title,
      date: data.endposition,
      polygon: { "type": "Feature", "properties": {},  "geometry": JSON.parse(data.footprint) }
    });
  })
  .on('end', () => {
    console.log(`Read ${scenes.length} scenes.`);
    fs.writeFileSync('test/scenes.json', JSON.stringify(scenes));
  });

