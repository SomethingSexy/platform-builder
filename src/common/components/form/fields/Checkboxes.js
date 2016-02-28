import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox.js';

class Checkboxes extends Component {
  static propTypes = {
    label: PropTypes.string,
    checkboxes: PropTypes.array.isRequired,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, name) {
    if (this.props.onChange) {
      this.props.onChange(value, name);
    }
  }

  render() {
    return (
      <fieldset className="form-group">
        <legend>{this.props.label}</legend>
        {this.props.checkboxes.map((result) => <Checkbox key={result.name} {...result} onChange={this.handleChange} />)}
      </fieldset>
    );
  }
}

export default Checkboxes;
