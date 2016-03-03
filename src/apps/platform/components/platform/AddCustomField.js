import React, { Component, PropTypes } from 'react';
import Select from '../../../../common/components/form/fields/Select.js';
import TextInput from '../../../../common/components/form/fields/TextInput.js';
import AddCustomFieldOptions from './AddCustomFieldOptions.js';
import Button from '../../../../common/components/Button.js';
import repeatable from '../../../../common/components/form/Repeatable.js';

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
  static propTypes = {
    field: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    addField: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    removeField: PropTypes.func.isRequired,
    type: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      showAddOptions: this.props.type === 'select'
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this, this.props.index);
  }

  handleTypeChange(name, value) {
    this.setState({
      showAddOptions: value === 'select'
    });
  }

  handleAddOption() {
    this.props.addField(`${this.props.field}.options`, {});
  }

  handleRemoveOption(index) {
    this.props.removeField(`${this.props.field}.options`, index);
  }

  handleRemoveField(index) {
    this.props.onRemove(index);
  }

  render() {
    const typeName = `${this.props.field}.type`;
    const labelName = `${this.props.field}.label`;
    const optionsField = `${this.props.field}.options`;
    const fieldCount = this.props.index + 1;
    return (
      <div>
        <fieldset className="form-inline">
          <legend>{`Custom Field #${fieldCount}`}</legend>
          <Select name={typeName} label="Type" onChange={this.handleTypeChange} options={fieldTypes} required />
          <TextInput name={labelName} label="Label" required />
          <Button onClick={this.props.onRemove}>Remove</Button>
        </fieldset>
        {this.state.showAddOptions ? <Button onClick={this.handleAddOption}>Add Option</Button> : null}
        {this.state.showAddOptions ? this.props.options.map((result, index) => <AddCustomFieldOptions key={result._id} index={index} field={optionsField} onRemove={this.handleRemoveOption} {...result} />) : null}
      </div>
    );
  }
}

export default repeatable(AddCustomField);
