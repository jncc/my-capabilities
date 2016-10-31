
import * as React from "react";

export class TemperatureInput extends React.Component<TemperatureInputProps, {}> {

  handleChange(e: any) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <fieldset>
        <legend>Enter temperature in {this.props.scale}:</legend>
        <input value={this.props.value} onChange={this.handleChange.bind(this)} />
      </fieldset>
    );
  }
}
interface TemperatureInputProps {
  value:    string;
  scale:    Scale;
  onChange: (value: string) => void;
}
