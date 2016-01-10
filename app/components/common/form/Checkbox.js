import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const value = this.props.selectedValue;
    const checked = this.props.value === value ? 'checked' : '';
    const name = this.props.name;
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" name={name} checked={checked} value={value} onChange={this.handleChange.bind(this)}></input>
          {this.props.label}
        </label>
      </div>
    );
  }

  handleChange(event) {
    // pass name in as a second parameter, in case the caller wants to easily combine change processing
    this.props.onChange(event.target.checked === true ? this.props.value : undefined, this.props.name);
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  selectedValue: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
  name: PropTypes.string.isRequired
};

export default Checkbox;
