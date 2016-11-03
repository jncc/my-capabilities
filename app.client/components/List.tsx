
import * as React from "react";

import { Scene } from "../../app.shared/Scene";

interface ListProps {
  scenes: Scene[];
}

export function List(props: ListProps) {

  let rows = props.scenes.map(scene => {
    return (
      <tr key={scene.name}>
        <th scope="row">1</th>
        <td>{scene.name.substring(0, 20)}</td>
        <td>{scene.date}</td>
        <td><button className="btn btn-primary">Download</button></td>
        <td><span></span></td>
      </tr>
    );
  });

  return (
    <div className="list">
      <table className="table">
        <thead>
          <tr><th>#</th><th>File</th><th>Date</th><th></th><th></th></tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}


