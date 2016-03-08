import React, { Component, PropTypes } from 'react';
import { Field, getField } from 'react-redux-form';
import Button from '../../../common/components/Button.js';

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

class FieldForm extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onFieldAddOption: PropTypes.func.isRequired,
    fieldKey: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.handleAddFieldOption = this.handleAddFieldOption.bind(this);
  }

  handleAddFieldOption() {
    this.props.onFieldAddOption(this.props.index);
  }

  render() {
    return (
      <div>
        <Field model={`${this.props.fieldKey}.fields[${this.props.index}].type`}
          validators={{
            required: (val) => val && val.length
          }}
        >
          <fieldset className="form-group">
            <label htmlFor="">Type</label>
            <select className="form-control">
              {fieldTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </fieldset>
        </Field>
        <Field model={`${this.props.fieldKey}.fields[${this.props.index}].label`}
          validators={{
            required: (val) => val && val.length
          }}
        >
          <fieldset className="form-group">
            <label htmlFor="">Label</label>
            <input type="text" className="form-control" />
          </fieldset>
        </Field>
        {this.props.field.type === 'select' ? <Button onClick={this.handleAddFieldOption}>Add Option</Button> : ''}
      </div>
    );
  }
}

export default FieldForm;
