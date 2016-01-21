import React, { Component, PropTypes } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type="button" className="btn btn-default" onClick={(e) => this.handleClick(e)}>{this.props.text}</button>
    );
  }

  handleClick(event) {
    this.props.onButtonClick(event);
  }
}

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
