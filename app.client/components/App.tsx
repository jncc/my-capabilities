
import * as React from "react";

import { Main } from "./Main";
import { Query, defaultQuery } from "./Query";
import { Scene } from "../../app.shared/Scene";


interface AppState {
  query:  Query;   // the current query
  scenes: Scene[]; // the most recently loaded query results (ordering corresponds to map z-index)
}

export class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = { query: defaultQuery(), scenes: new Array() };
  }

  render() {
    return ( <Main {...this.state} queryChanged={this.handleQueryChange.bind(this)} /> );
  }

  handleQueryChange(query: Query) {
    // update state.query
    this.setState({ query: query, scenes: this.state.scenes });

    this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.query);
  }

  gotData(scenes: any) {
    this.setState({ query: this.state.query, scenes: scenes });
  }

  getData() {

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
      });
  }
}

