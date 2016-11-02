
import * as React from "react";
import * as ReactDOM from "react-dom"
import * as L from "leaflet";

export class Map extends React.Component<any, {}> {

  map: L.Map;

  componentDidMount() {
    var map = this.map = L.map(ReactDOM.findDOMNode(this) as HTMLElement, {
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
    map.setView([54.50, -4.00], 5)
  }

  // componentWillUnmount() {
  //   this.map.off('click', this.onMapClick);
  //   this.map = null;
  // }

  onMapClick() {
    console.log('clicked!');
  }

  render() {
    return <div className="map"></div>;
  }
}

