import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    buttonClass: PropTypes.string
  }

  static defaultProps = {
    buttonClass: 'btn-secondary'
  }

  constructor(props) {
    super(props);
  }

  render() {
    let clazz = 'btn';
    if (this.props.buttonClass) {
      clazz = clazz + ' ' + this.props.buttonClass;
    }

    return (
      <button type="button" className={clazz} onClick={(e) => this.handleClick(e)}>{this.props.text}</button>
    );
  }

  handleClick(event) {
    this.props.onButtonClick(event);
  }
}

export default Button;
