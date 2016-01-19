import React, { Component, PropTypes } from 'react';
import TextInput from '../../common/form/fields/TextInput';
import Form from '../../common/form/Form';

class AddCustomFieldOptions extends Component {
  static get propTypes() {
    return {
      onSave: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
  }

  render() {
    return (
      <Form onSave={this.handleSave.bind(this)}>
        <TextInput label="Label" name="label" required/>
        <TextInput label="Value" name="value" required/>
      </Form>
    );
  }

  handleSave(form) {
    console.log(form);
    this.props.onSave(form);
  }
}

export default AddCustomFieldOptions;
