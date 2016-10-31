
import * as React from "react";
import { TemperatureInput } from './TemperatureInput';
import { BoilingVerdict } from './BoilingVerdict';

interface CalculatorState {
  value: string;
  scale: string;
}

export class Calculator extends React.Component<any, CalculatorState> {

  constructor(props: any) {
    super(props);
    this.state = { value: '', scale: 'Celsius' };
  }

  handleCelsiusChange(value: string) {
    this.setState({ scale: 'Celsius', value });
  }

  handleFahrenheitChange(value: string) {
    this.setState({ scale: 'Fahrenheit', value });
  }

  render() {
    const celsius = this.state.scale === 'Fahrenheit' ? tryConvert(this.state.value, toCelsius) : this.state.value;
    const fahrenheit = this.state.scale === 'Celsius' ? tryConvert(this.state.value, toFahrenheit) : this.state.value;

    return (
      <div>
        <h1>Blah</h1>
        <TemperatureInput scale="Celsius" value={celsius} onChange={this.handleCelsiusChange.bind(this)} />
        <TemperatureInput scale="Fahrenheit" value={fahrenheit} onChange={this.handleFahrenheitChange.bind(this)} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

function toCelsius(fahrenheit: number) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius: number) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(value: string, convert: (n: number) => number ) {
  const input = parseFloat(value);
  if (isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}



