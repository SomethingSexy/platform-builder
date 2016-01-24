import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../../common/components/form/fields/TextInput.js';
import repeatable from '../../../../../common/components/form/Repeatable.js';


class AddCustomFieldOptions extends Component {
  static get propTypes() {
    return {
      field: PropTypes.string
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
  }

  render() {
    const valueName = this.props.field + '.type';
    const labelName = this.props.field + '.label';
    return (
      <div>
        <TextInput label="Label" name={labelName} required/>
        <TextInput label="Value" name={valueName} required/>
      </div>
    );
  }
}

export default repeatable(AddCustomFieldOptions);
