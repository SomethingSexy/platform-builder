import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../../common/components/form/fields/TextInput.js';
import Textarea from '../../../../../common/components/form/fields/Textarea.js';
import form from '../../../../../common/components/form/Form.js';

const model = {
  name: '',
  description: '',
  type: '',
  fields: [],
  createdPlatformId: ''
};

class AddPartForm extends Component {
  render() {
    return (
      <div>
        <TextInput name="name" label="Name" />
        <Textarea name="description" label="Description" />
      </div>
    );
  }
}

export default form(AddPartForm, {
  model
});
