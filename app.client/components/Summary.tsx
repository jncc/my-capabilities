
import * as React from "react";

import { Scene } from "../../app.shared/Scene";

interface SummaryProps {
  scenes: Scene[];
  getLinkClicked: () => void;
}

const MAX_SCENE_COUNT = 50;

export function Summary(props: SummaryProps) {

  let getLinkClicked = (e: any) => {
    props.getLinkClicked();
  }

  let tooManyScenes = props.scenes.length > MAX_SCENE_COUNT;

  let message = tooManyScenes
    ? (<span>More than <span className="summary-count">{props.scenes.length}</span> scenes selected. Apply filters.</span>)
    : (<span><span className="summary-count">{props.scenes.length}</span> scenes selected</span>);

  return (
    <div className="summary">
    <div className="form-inline form pull-right">
      {message}
      <button className="btn btn-danger" disabled={tooManyScenes}
        onClick={getLinkClicked}>Get Link</button>
    </div>
    </div>
  );
}

