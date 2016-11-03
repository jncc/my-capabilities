
import * as React from "react";

import { Query } from "./Query";

interface FormProps {
  query: Query;
  onQueryChange: (query: Query) => void;
}

export function Form(props: FormProps) {

  let startChanged = (e: any) => {
    props.query.start = e.target.value;
    props.onQueryChange(props.query);
  }

  let endChanged = (e: any) => {
    props.query.end = e.target.value;
    props.onQueryChange(props.query);
  }

  let bboxChanged = (e: any) => {
    props.query.bbox = JSON.parse(e.target.value);
    props.onQueryChange(props.query);
  }

  return (
    <div className="form-inline form">
      <div className="form-group">
        <input type="text" value={props.query.start} onChange={startChanged} className="form-control" placeholder="Start date"></input>
      </div>
      <div className="form-group">
        <input type="text" value={props.query.end} onChange={endChanged} className="form-control" placeholder="End date"></input>
      </div>
      <div className="form-group">
        <input type="text" value={JSON.stringify(props.query.bbox)} onChange={bboxChanged} className="form-control" placeholder="Bbox"></input>
      </div>
      <button className="btn btn-danger">Update</button>
    </div>
  );
}

