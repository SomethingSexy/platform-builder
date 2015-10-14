import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = props.value || {};
  }

  render() {
    const value = this.state.value;
    return (
      <div className ="form-group">
        <label htmlFor="">{this.props.label}</label>
        <input type="email" className ="form-control" id="" placeholder="" value={value} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }
}

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ])
};

export default TextInput;
