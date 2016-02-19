import React, { Component, PropTypes } from 'react';

class Input extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      validations: React.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      inline: PropTypes.bool
    };
  }

  // pull these from the form
  static get contextTypes() {
    return {
      attachToForm: PropTypes.func.isRequired,
      detachFromForm: PropTypes.func.isRequired,
      onFormFieldChange: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.required = props.required ? true : false;
    this.state = {
      isValid: true,
      errorMessage: '',
      value: props.value || ''
    };
  }

  static get defaultProps() {
    return {
      inline: false
    };
  }

  componentWillMount() {
    if (this.context.attachToForm) {
      this.context.attachToForm(this); // Attaching the component to the form
    }
  }

  componentWillUnmount() {
    if (this.context.detachFromForm) {
      this.context.detachFromForm(this); // Detaching if unmounting
    }
  }

  getValue(event) {
    return event.target.value;
  }

  handleChange(event) {
    const value = this.getValue(event);
    const name = this.props.name;
    // store the state in case we need it for future use
    this.setState({
      value
    });

    // onChange is not required but in case we need to process something outside
    // of the form
    if (this.props.onChange) {
      this.props.onChange(name, value);
    }

    // trigger a change on the form
    this.context.onFormFieldChange(name, value);
  }
}

export default Input;
