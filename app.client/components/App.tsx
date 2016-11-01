
import * as React from "react";

import { Header } from "./Header";
import { List } from "./List";
import { Map } from "./Map";

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
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <Map />
            </div>
            <div className="col-md-7">
              <h1>Mappificator</h1>
              <div>This app is an example.</div>
              <br />
              <List blah="foo" />
            </div>
            <img src="images/owl.jpg" />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

