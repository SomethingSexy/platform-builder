import React, { Component, PropTypes } from 'react';
import Select from '../../../../../common/components/form/fields/Select.js';
import TextInput from '../../../../../common/components/form/fields/TextInput.js';
import AddCustomFieldOptions from './AddCustomFieldOptions.js';
import Button from '../../../../../common/components/Button.js';
import repeatable from '../../../../../common/components/form/Repeatable.js';

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
      index: PropTypes.number.isRequired,
      onRemove: PropTypes.func.isRequired,
      addField: PropTypes.func.isRequired,
      options: PropTypes.array.isRequired,
      removeField: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showAddOptions: false
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
          <Button text="Remove" onButtonClick={this.props.onRemove}  />
        </fieldset>
        {this.state.showAddOptions ? <Button text="Add Option" onButtonClick={this.handleAddOption.bind(this)} /> : null}
        {this.state.showAddOptions ? this.props.options.map((result, index) => { return <AddCustomFieldOptions key={result._id} index={index} field={optionsField} onRemove={this.handleRemoveOption.bind(this, index)} {...result} />; }) : null}
      </div>
    );
  }

  handleTypeChange(name, value) {
    this.setState({
      showAddOptions: value === 'select' ? true : false
    });
  }

  handleAddOption() {
    this.props.addField(this.props.field + '.options', {});
  }

  handleRemoveOption(index) {
    this.props.removeField(this.props.field + '.options', index);
  }
}

export default repeatable(AddCustomField);
