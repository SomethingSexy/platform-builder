import React, { Component, PropTypes } from 'react';
import Button from '../../../../../common/components/Button.js';

class Part extends Component {
  static get propTypes() {
    return {
      data: PropTypes.object.isRequired,
      onRemove: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <li><span>{this.props.data.name}</span><Button text="Remove" onButtonClick={this.handleRemove.bind(this)} /></li>
    );
  }

  handleRemove(event) {
    event.stopPropagation();
    this.props.onRemove(this.props.data.id);
  }
}

export default Part;
