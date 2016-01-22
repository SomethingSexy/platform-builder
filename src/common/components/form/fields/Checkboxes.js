import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox.js';

class Checkboxes extends Component {
  static get propTypes() {
    return {
      label: PropTypes.string,
      checkboxes: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2">{this.props.label}</label>
        <div className="col-sm-10">
          {this.props.checkboxes.map((result) => {
            return <Checkbox key={result.name} {...result} onchange={this.handleChange.bind(this)}/>;
          })}
        </div>
      </div>

    );
  }

  handleChange(value, name) {
    this.props.onChange(value, name);
  }
}

export default Checkboxes;
