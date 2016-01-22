import React, { PropTypes } from 'react';
import Input from './Input.js';

class Checkbox extends Input {
  static get propTypes() {
    return Object.assign({
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
      ])
    }, Input.propTypes);
  }

  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      errorMessage: '',
      value: props.selectedValue || ''
    };
  }

  getValue(event) {
    return event.target.checked === true ? this.props.value : undefined;
  }

  render() {
    const value = this.state.value;
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
}

export default Checkbox;
