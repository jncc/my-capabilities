
import * as React from "react";
import * as ReactDOM from "react-dom"
import * as L from "leaflet";

import { Scene } from "../../app.shared/Scene";

interface MapProps {
  scenes: Scene[];
}

export class Map extends React.Component<MapProps, {}> {

  map: L.Map;
  layerGroup: L.LayerGroup; // a group for the rectangles


  componentDidMount() {
    let map = this.map = L.map(ReactDOM.findDOMNode(this) as HTMLElement, {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer(
          'https://{s}.tiles.mapbox.com/v4/petmon.lp99j25j/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0bW9uIiwiYSI6ImdjaXJLTEEifQ.cLlYNK1-bfT0Vv4xUHhDBA',
          { attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
      ],
      attributionControl: false,
    });

    map.on('click', this.onMapClick);
    this.layerGroup = L.layerGroup([]).addTo(map);
    map.setView([54.50, -4.00], 5)

    // add the bbox
    L.rectangle([[53, -8], [57, 0]], { fillOpacity: 0.1 }).addTo(this.map);
  }

  // componentWillUnmount() {
  //   this.map.off('click', this.onMapClick);
  //   this.map = null;
  // }


  componentDidUpdate(prevProps, prevState) {
    console.log("map component updated");

    if (this.map) {
      this.layerGroup.clearLayers();
      // add the scenes
      this.props.scenes.forEach(s => {
        let layer = L.geoJSON(s.polygon, style);
        this.layerGroup.addLayer(layer);
      });
    }
  }

  onMapClick() {
    console.log('clicked!');
  }

  render() {
    return <div className="map"></div>;
  }
}

const style = { fillOpacity: 0.1, weight: 1, color: '#888' };
