import React, { Component, PropTypes } from 'react';
import Select from '../../common/form/fields/Select';
import TextInput from '../../common/form/fields/TextInput';
import Form from '../../common/form/Form';
import FieldOptions from './FieldOptions';

const fieldTypes = [{
  label: '',
  value: ''
}, {
  label: 'Select',
  value: 'select'
}, {
  label: 'Textbox',
  value: 'text'
}];

class AddCustomField extends Component {
  static get propTypes() {
    return {
      // onAddOption: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {
      options: [] // if the field is a select, options will get stored here
    };
  }

  render() {
    return (
      <div>
        <Form onSave={this.handleSave.bind(this)}>
          <legend>Custom Field</legend>
          <Select name="type" label="Type" onChange={this.handleTypeChange.bind(this)} options={fieldTypes}/>
          <TextInput name="label" label="Label" onChange={this.handleLabelChange.bind(this)}/>
        </Form>
        {this.state.showAddOptions ? <FieldOptions onUpdateOptions={this.handleUpdateOptions.bind(this)} options={this.state.options}/> : null}
      </div>
    );
  }

  handleTypeChange(type) {
    this.setState({
      showAddOptions: type === 'select' ? true : false,
      type
    });
  }

  handleLabelChange(label) {
    this.setState({
      label
    });
  }

  handleSave() {
    console.log('save field');
    console.log(this.state);
  }

  // this will only be used if select type is selected
  handleUpdateOptions(options) {
    this.setState(() => {
      return options;
    });
  }
}

export default AddCustomField;
