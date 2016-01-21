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
      onFieldAdd: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
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

  handleLabelChange(name, label) {
    this.setState({
      label
    });
  }

  handleSave() {
    this.setState({
      showAddOptions: false
    });
    this.props.onFieldAdd(Object.assign({}, this.state));
  }

  // this will only be used if select type is selected
  handleUpdateOptions(options) {
    this.setState(() => {
      return options;
    });
  }
}

export default AddCustomField;
