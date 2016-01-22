import React, { PropTypes } from 'react';
import Input from './Input.js';

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

  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      errorMessage: '',
      value: props.value || ''
    };
  }

  render() {
    let className = 'form-group row';

    if (!this.state.isValid) {
      className += ' has-error';
    }

    return (
      <div className ={className}>
        <label className="col-sm-2 form-control-label" htmlFor="">{this.props.label}</label>
        <div className="col-sm-10">
          <input type="text"  name={this.props.name} className ="form-control" id="" placeholder="" value={this.state.value} onChange={this.handleChange.bind(this)} />
          {!this.state.isValid ? <span id="helpBlock2" className="help-block">{this.state.errorMessage}</span> : null }
        </div>
      </div>
    );
  }

}

export default TextInput;
