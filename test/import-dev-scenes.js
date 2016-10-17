/// <reference path="../node_modules/@types/node/index.d.ts" />
"use strict";
var csv = require('csv-parser');
var fs = require('fs');
var scenes = new Array();
fs.createReadStream('test/scenes.csv')
    .pipe(csv({ quote: '"' }))
    .on('data', function (data) {
    console.log("Reading '" + data.title + "'");
    scenes.push({
        name: data.title,
        date: data.endposition,
        polygon: { "type": "Feature", "properties": {}, "geometry": JSON.parse(data.footprint) }
    });
})
    .on('end', function () {
    console.log("Read " + scenes.length + " scenes.");
    fs.writeFileSync('test/scenes.json', JSON.stringify(scenes));
});
