
import * as React from "react";

export class TemperatureInput extends React.Component<TemperatureInputProps, {}> {

  handleChange(e: any) {
    this.props.onChange(e.target.value);
  }

  render() {
    let label = `Temperature in ${this.props.scale}`;
    return (
      <form className="form-inline">
        <div className="form-group">
          <label className="sr-only">{label}</label>
          <div className="input-group">
            <input type="text" className="form-control" value={this.props.value} onChange={this.handleChange.bind(this)} placeholder={label} />
            <div className="input-group-addon">{this.props.scale}</div>
          </div>
        </div>
      </form>
    );
  }
}
interface TemperatureInputProps {
  value:    string;
  scale:    Scale;
  onChange: (value: string) => void;
}
