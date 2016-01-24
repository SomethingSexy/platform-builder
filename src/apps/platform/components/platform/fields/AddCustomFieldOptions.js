import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../../common/components/form/fields/TextInput.js';


class AddCustomFieldOptions extends Component {
  static get propTypes() {
    return {};
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
  }

  render() {
    return (
      <div>
        <TextInput label="Label" name="label" required/>
        <TextInput label="Value" name="value" required/>
      </div>
    );
  }
}

export default AddCustomFieldOptions;
