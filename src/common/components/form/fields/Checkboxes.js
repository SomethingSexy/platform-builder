import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox.js';

class Checkboxes extends Component {
  static get propTypes() {
    return {
      label: PropTypes.string,
      checkboxes: PropTypes.array.isRequired,
      onChange: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <fieldset className="form-group">
        <legend>{this.props.label}</legend>
        {this.props.checkboxes.map((result) => {
          return <Checkbox key={result.name} {...result} onChange={this.handleChange.bind(this)}/>;
        })}
      </fieldset>
    );
  }

  handleChange(value, name) {
    if (this.props.onChange) {
      this.props.onChange(value, name);
    }
  }
}

export default Checkboxes;
