
import * as React from "react";
import * as moment from "moment";
let FlipMove = require('react-flip-move');

import { Scene } from "../../app.shared/Scene";


interface ListProps {
  scenes: Scene[];
}

export function List(props: ListProps) {

  let rows = props.scenes.map(scene => {
    return (
      <div key={scene.name} className="item">
        <div className="item-left">
          <div>
            <div>X</div>
          </div>
        </div>
        <div className="item-main">
          <div className="item-main-title">{scene.name}</div>
          <div className="item-main-cell">{moment(scene.date).format("D MMM YYYY")}</div>
        </div>
        <div className="item-right">
          <div>
            <div>X</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <FlipMove {...flipMoveAnimationProps}>
        {rows}
      </FlipMove>
    </div>
  );
}

let flipMoveAnimationProps = {
  duration: 200,
  enterAnimation: "fade",
  leaveAnimation: "accordianVertical",
  staggerDurationBy: 25,
};
