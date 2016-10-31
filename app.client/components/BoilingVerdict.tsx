
import * as React from "react";

export function BoilingVerdict(props: BoilingVerdictProps) {

  if (props.celsius >= 100) {
    return <p>The water would absolutely boil.</p>;
  }
  else {
    return <p>The water would totally not boil.</p>;
  }
}

interface BoilingVerdictProps {
  celsius: number;
}
