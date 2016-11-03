
import * as React from "react";
import * as NProgress from "nprogress";
// import * as queryString from "query-string";

import { Header } from "./Header";
import { Form } from "./Form";
import { List } from "./List";
import { Map } from "./Map";
import { Debug } from "./Debug";
import { Query, defaultQuery } from "./Query";
import { Scene } from "../../app.shared/Scene";


interface AppState {
  query:  Query;
  scenes: Scene[];
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = { query: defaultQuery(), scenes: new Array() };
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
              <h1>Sentinel 2</h1>
              <br />
              <Form query={this.state.query} onQueryChange={this.handleQueryChange.bind(this)} />
              <List scenes={this.state.scenes} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleQueryChange(query: Query) {
    // update state.query
    this.setState({ query: query, scenes: this.state.scenes });

    this.getData();
  }

  componentDidMount() {

    console.log("app did mount");
    this.getData();

    NProgress.configure({ parent: "#progress-target" });
    NProgress.start();
    setTimeout(() => NProgress.done(), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.query);
  }

  gotData(scenes: any) {
    this.setState({ query: this.state.query, scenes: scenes });
  }

  getData() {
    NProgress.start();
    // todo unparse properly!
    //queryString.stringify(this.state.query as any))
    let bbox = `bbox=[${this.state.query.bbox[0]},${this.state.query.bbox[1]},${this.state.query.bbox[2]},${this.state.query.bbox[3]}]`;
    let start = `start=` + this.state.query.start;
    let end = `end=` + this.state.query.end;
    fetch('/layers?' + bbox + '&' + start + '&' + end)
      .then(res => res.json())
      .then(json => {
        this.gotData(json);
      }).catch(ex => {
        console.log('parsing failed', ex);
      })
      .then(() => { NProgress.done() });
  }
}

