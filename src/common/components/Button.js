import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    buttonClass: PropTypes.string,
    children: PropTypes.string.isRequired
  }

  static defaultProps = {
    buttonClass: 'btn-secondary'
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onButtonClick(event);
  }

  render() {
    let clazz = 'btn';
    if (this.props.buttonClass) {
      clazz = `${clazz} ${this.props.buttonClass}`;
    }

    return (
      <button type="button" className={clazz} onClick={this.handleClick}>{this.props.children}</button>
    );
  }
}

export default Button;
