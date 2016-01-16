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

}

export default Input;


