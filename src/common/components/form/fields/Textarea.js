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
    this.state = {
      isValid: true,
      errorMessage: '',
      value: props.value || ''
    };
  }

  render() {
    const value = this.state.value;
    let className = 'form-group';

    if (!this.state.isValid) {
      className += ' has-error';
    }

    return (
      <fieldset className={className}>
        <label htmlFor="">{this.props.label}</label>
        <textarea type="email" className ="form-control" id="" placeholder="" value={value} onChange={this.handleChange.bind(this)} />
        {!this.state.isValid ? <span id="helpBlock2" className="help-block">{this.state.errorMessage}</span> : null }
      </fieldset>
    );
  }
}

export default Textarea;
