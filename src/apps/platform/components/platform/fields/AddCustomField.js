import React, { Component, PropTypes } from 'react';
import Select from '../../../../../common/components/form/fields/Select.js';
import TextInput from '../../../../../common/components/form/fields/TextInput.js';
import AddCustomFieldOptions from './AddCustomFieldOptions.js';
import Button from '../../../../../common/components/Button.js';
import repeatable from '../../../../../common/components/form/Repeatable.js';
import update from 'react-addons-update';

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
      field: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      options: [] // if the field is a select, options will get stored here
    };
  }

  render() {
    const typeName = this.props.field + '.type';
    const labelName = this.props.field + '.label';
    const optionsField = this.props.field + '.options';
    return (
      <div>
        <fieldset className="form-inline">
          <legend>{'Custom Field #' + (this.props.index + 1)}</legend>
          <Select name={typeName} label="Type" onChange={this.handleTypeChange.bind(this)} options={fieldTypes}/>
          <TextInput name={labelName} label="Label"/>
        </fieldset>
        {this.state.showAddOptions ? <Button text="Add Option" onButtonClick={this.handleAddField.bind(this)} /> : null}
        {this.state.showAddOptions ? this.state.options.map((result, index) => { return <AddCustomFieldOptions key={index} index={index} field={optionsField} {...result} />; }) : null}
      </div>
    );
  }

  handleTypeChange(name, value) {
    this.setState({
      showAddOptions: value === 'select' ? true : false
    });
  }

  handleAddField() {
    this.setState({
      options: update(this.state.options, {$push: [{}]})
    });
  }
}

export default repeatable(AddCustomField);
