import React, { Component, PropTypes } from 'react';

class Input extends Component {
  static get propTypes() {
    return {
      validations: React.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ])
    };
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
}

Input.contextTypes = {
  attachToForm: PropTypes.func.isRequired,
  detachFromForm: PropTypes.func.isRequired
};

export default Input;


