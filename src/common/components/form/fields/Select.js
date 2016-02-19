import React, { PropTypes } from 'react';
import Input from './Input.js';
import field from './Field.js';

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
  }

  render() {
    let className = 'form-group';

    if (!this.state.isValid) {
      className += ' has-error';
    }

    const value = this.state.value;

    return (
      <fieldset className={className}>
        <label htmlFor="">{this.props.label}</label>
        <select name={this.props.name} className="form-control" value={value} onChange={this.handleChange.bind(this)}>
          {this.props.options.map((result) => {
            return <option key={result.value} value={result.value}>{result.label}</option>;
          })}
        </select>
      </fieldset>
    );
  }
}

export default field(Select);
