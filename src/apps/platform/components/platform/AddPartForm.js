import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../common/components/form/fields/TextInput.js';
import Textarea from '../../../../common/components/form/fields/Textarea.js';
import form from '../../../../common/components/form/Form.js';
import Button from '../../../../common/components/Button.js';
import AddCustomField from './AddCustomField.js';

const model = {
  name: '',
  description: '',
  type: '',
  fields: [],
  createdPlatformId: ''
};

class AddPartForm extends Component {
  static get propTypes() {
    return {
      addField: PropTypes.func.isRequired,
      removeField: PropTypes.func.isRequired,
      form: PropTypes.object.isRequired,
      validate: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div>
        <TextInput name="name" label="Name" required/>
        <Textarea name="description" label="Description" required/>
        <h3>Custom Fields</h3>
        <Button text="Add Field" onButtonClick={this.handleAddField.bind(this)}/>
        {this.props.form.fields.map((result, index) => {
          return <AddCustomField key={result._id} index={index} field="fields" onRemove={this.handleRemoveField.bind(this, index)} addField={this.props.addField} removeField={this.props.removeField} {...result} />;
        })}
        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
      </div>
    );
  }

  handleAddField() {
    this.props.addField('fields', {options: []});
  }

  handleRemoveField(index) {
    this.props.removeField('fields', index);
  }

  handleSave(event) {
    // PROBABLY not the best way to do this but it will work for now
    this.props.validate(event, data => {
      this.props.onSave(data);
    });
  }
}

export default form(AddPartForm, {
  model
});
