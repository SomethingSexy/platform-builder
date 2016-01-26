import React, { PropTypes } from 'react';
import Input from './Input.js';

class Textarea extends Input {
  static get propTypes() {
    return Object.assign({
      label: PropTypes.string.isRequired,
      value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
      ])
    }, Input.propTypes);
  }

  constructor(props) {
    super(props);
    this.state = props.value || {};
  }

  render() {
    const value = this.state.value;
    return (
      <fieldset className ="form-group">
        <label htmlFor="">{this.props.label}</label>
        <textarea type="email" className ="form-control" id="" placeholder="" value={value} onChange={this.handleChange.bind(this)} />
      </fieldset>
    );
  }
}

export default Textarea;
