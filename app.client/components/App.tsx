
import * as React from "react";
import * as ReactDOM from "react-dom"

import * as L from "leaflet";

interface AppState {
  value: string;
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    return (
      <div>
        <h1>Mappificator</h1>
        <div>This app is an example.</div>
        <br />
     		<img src="images/owl.jpg" />
        <br />
        <Map />
      </div>
    );
  }
}

class Map extends React.Component<any, {}> {

  map: any;

  componentDidMount() {
    var map = this.map = L.map(ReactDOM.findDOMNode(this) as HTMLElement, {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
      ],
      attributionControl: false,
    });

    map.on('click', this.onMapClick);
    map.fitWorld();
  }

  componentWillUnmount() {
    this.map.off('click', this.onMapClick);
    this.map = null;
  }

  onMapClick() {
    console.log('clicked!');
  }

  render() {
    return <div className="map"></div>;
  }
}

