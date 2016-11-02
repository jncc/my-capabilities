
import * as React from "react";

import { Header } from "./Header";
import { List } from "./List";
import { Map } from "./Map";

import * as NProgress from "nprogress";


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
        <div className="container"  >
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

  componentDidMount() {

    this.getData();

    NProgress.configure({ parent: "#progress-target" });
    // NProgress.configure({ parent: 'header' });
    NProgress.start();
    //setTimeout(() => NProgress.done(), 2000);
    NProgress.done(true);
  }

  getData() {
    fetch('/layers')
      .then(res => res.json())
      .then(json => {
        console.log('parsed json', json)
      }).catch(ex => {
        console.log('parsing failed', ex)
      });
  }
}

