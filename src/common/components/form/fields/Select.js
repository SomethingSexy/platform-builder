import React, { Component, PropTypes } from 'react';
import Input from './Input.js';

class Select extends Input {
  static get propTypes() {
    return Object.assign({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]),
      options: PropTypes.array.isRequired
    }, Input.propTypes);
  }

  constructor(props) {
    super(props);
    this.state = props.value || {};
  }

  render() {
    const value = this.state.value;
    return (
      <div className ="form-group row">
        <label className="col-sm-2 form-control-label" htmlFor="">{this.props.label}</label>
        <div className="col-sm-10">
          <select className="form-control" value={this.props.value} onChange={this.handleChange.bind(this)}>
            {this.props.options.map((result) => {
              return <option key={result.value} value={result.value}>{result.label}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default Select;
