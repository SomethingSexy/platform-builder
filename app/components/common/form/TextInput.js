import React from 'react';
import { Router, Route, Link } from 'react-router';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.value || {};
    this.label = props.label;
    this.onChange = props.onChange;
    console.log(props);
  }

  render() {
    const value = this.state.value;
    return (
      <div className ="form-group">
        <label htmlFor="exampleInputEmail1">{this.label}</label>
        <input type="email" className ="form-control" id="" placeholder="" value={value} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

  handleChange(event) {
    if (this.onChange) {
      this.onChange(event);
    }
  }
}

export default TextInput;
