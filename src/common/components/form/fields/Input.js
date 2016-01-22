import React, { Component, PropTypes } from 'react';

class Input extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      validations: React.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ])
    };
  }

  constructor(props) {
    super(props);

    this.required = props.required ? true : false;
  }

  componentWillMount() {
    if (this.context.attachToForm) {
      console.log('attachToForm');
      this.context.attachToForm(this); // Attaching the component to the form
    }
  }

  componentWillUnmount() {
    if (this.context.detachFromForm) {
      console.log('detachFromForm');
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

Input.contextTypes = {
  attachToForm: PropTypes.func.isRequired,
  detachFromForm: PropTypes.func.isRequired,
  onFormFieldChange: PropTypes.func.isRequired
};

export default Input;


