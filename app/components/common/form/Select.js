import React, { Component, PropTypes } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = props.value || {};
  }

  render() {
    const value = this.state.value;
    return (
      <div className ="form-group">
        <label htmlFor="">{this.props.label}</label>
        <select className="form-control">
          {this.props.options.map((result) => {
            return <option value={result.value}>{result.label}</option>;
          })}
        </select>
      </div>
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  options: PropTypes.array.isRequired
};

export default Select;
