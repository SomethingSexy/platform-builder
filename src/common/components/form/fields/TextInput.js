import React, { PropTypes } from 'react';
import Input from './Input.js';
import field from './Field.js';

class TextInput extends Input {
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

  render() {
    let className = 'form-group';

    if (!this.state.isValid) {
      className += ' has-error';
    }

    return (
      <fieldset className={className}>
        <label htmlFor="">{this.props.label}</label>
        <input type="text" name={this.props.name} className ="form-control" id="" placeholder="" value={this.state.value} onChange={this.handleChange} />
        {!this.state.isValid ? <span id="helpBlock2" className="help-block">{this.state.errorMessage}</span> : null }
      </fieldset>
    );
  }
}

export default field(TextInput);
