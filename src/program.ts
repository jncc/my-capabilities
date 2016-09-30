import * as builder from "xmlbuilder"
import { Layer } from "./layer"
import { xmlTemplate } from "./xml-template"

let makeLayer = function() : Layer {
  return {
    "@queryable"       : 1,
    "@opaque"          : 0,
    "Name"             : "EODIP:14March2016_80_4_NDVI",
    "Title"            : "14March2016_80_4_NDVI",
    "Abstract"         : "", //null,
    "KeywordList"      : {
      "Keyword" : [ "WCS", "GeooTIFF", "14March2016_80_4_NDVI" ]
    },
    "SRS"              : "EPSG:27700",
    "LatLonBoundingBox": {
      "@minx": "-6.12632079353505",
      "@miny": "51.30238930387951",
      "@maxx": "-1.3190873002504129",
      "@maxy": "54.177806778383"
    },
    "BoundingBox"      : {
      "@SRS" : "EPSG:27700",
      "@minx": "130378.85316",
      "@miny": "163032.59084999998",
      "@maxx": "444543.80235",
      "@maxy": "475787.06887"
    },
    "Style"            : {
      "Name"     : "EODIP:NDVI",
      "Title"    : "NDVI",
      "Abstract" : "NDVI",
      "LegendURL": {
        "@width"        : "63",
        "@height"       : "362",
        "Format"        : "image/png",
        "OnlineResource": {
          "@xmlns:xlink" : "http://www.w3.org/1999/xlink",
          "@xlink:type"  : "simple",
          "@xlink:href"  : "https://eodip.jncc.gov.uk:443/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=EODIP%3A14March2016_80_4_NDVI"
        }
      }
    }
  };
}


let makeLayerXmlElement = (layer : any) => {
  // make an xmlbuilder node
  let root = builder.create('root').ele("Layer", layer);
  return root.ele('Layer', layer)
    .toString({
      pretty: true,
      indent: '  ',
      offset: 1,
      newline: '\n'
    }); // convert the child node to a string - this xmlbuilder library is very limited
}

// let xml = makeLayerXmlElement({foo:"bar"});
// console.log(xml);

let layers = [ makeLayer() ];

// get the main xml template
// replace "{{{layers}}}" with the elements made from the layers array
let output = xmlTemplate.replace("{{{layers}}}", "");

let layer = makeLayer();
let xml = makeLayerXmlElement(layer);
console.log(xml);




