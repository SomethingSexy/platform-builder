import React, { Component, PropTypes } from 'react';

class AddCustomField extends Component {
  static get propTypes() {
    return {
      // data: PropTypes.object.isRequired
    };
  }

  render() {
    return (
      <form>
        <legend>Custom Field</legend>
      </form>
    );
  }
}

export default AddCustomField;
