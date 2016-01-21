import React, { Component, PropTypes } from 'react';

class CustomField extends Component {
  static get propTypes() {
    return {
      data: PropTypes.object.isRequired
    };
  }

  render() {
    return (
      <li><span>{this.props.data.type}</span><span>{this.props.data.label}</span></li>
    );
  }
}

export default CustomField;
