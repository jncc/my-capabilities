
import * as React from "react";
import * as NProgress from "nprogress";

import { Header } from "./Header";
import { List } from "./List";
import { Map } from "./Map";
import { Scene } from "../../app.shared/Scene";

interface AppState {
  scenes: Scene[];
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = { scenes: new Array() };
  }

  render() {

    return (
      <div>
        <Header />
        <div className="container"  >
          <div className="row">
            <div className="col-md-5">
              <Map scenes={this.state.scenes} />
            </div>
            <div className="col-md-7">
              <h1>Mappificator</h1>
              <div>This app is an example.</div>
              <br />
              <List scenes={this.state.scenes} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {

    this.getData();

    NProgress.configure({ parent: "#progress-target" });
    NProgress.start();
    setTimeout(() => NProgress.done(), 1000);
  }

  updateMap() {

  }
  gotData(scenes: any) {
    this.setState({ scenes: scenes });
  }

  getData() {
    fetch('/layers')
      .then(res => res.json())
      .then(json => {
        console.log('parsed json', json);
        this.gotData(json);
      }).catch(ex => {
        console.log('parsing failed', ex);
      });
  }
}

