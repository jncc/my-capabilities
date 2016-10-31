
import * as React from "react";

export function BoilingVerdict(props: BoilingVerdictProps) {

  return (
    <div className="verdict">
      {(props.celsius >= 100)
        ? <p className="text-danger">The water would absolutely boil.</p>
        : <p className="text-info">The water would totally not boil.</p>}
    </div>
  );
}

interface BoilingVerdictProps {
  celsius: number;
}
