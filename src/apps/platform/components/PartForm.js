import React, { Component, PropTypes } from 'react';
import Button from '../../../common/components/Button.js';
import FieldForm from './FieldForm.js';

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required';
    }
    return errors;
  }, {});

const validateFields = requireFields('type', 'label');
export const validate = values => {
  const errors = requireFields('name', 'description')(values);
  errors.fields = values.fields.map(validateFields);

  return errors;
};

export const fields = [
  'name',
  'description',
  'fields[].type',
  'fields[].label',
  'fields[].options[].label',
  'fields[].options[].value'
];

class PartForm extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    name: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool
  }

  render() {
    const { name, description, fields } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <fieldset className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className ="form-control" placeholder="" {...name} />
          {name.touched && name.error && <span id="helpBlock2" className="help-block">{name.error}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Description</label>
          <textarea type="email" className ="form-control" id="" placeholder="" {...description} />
          {description.touched && description.error && <span id="helpBlock2" className="help-block">{description.error}</span>}
        </fieldset>
        <h4>Custom Fields</h4>
          <button className="btn btn-secondary btn-sm" type="button" onClick={() => {
            fields.addField({ options: [] });
          }}
          ><i /> Add Field
          </button>
        {fields.map((field, index) => <FieldForm key={index} {...field} />)}
        <hr />
        <button type="input" className="btn btn-primary" onClick={ this.handleSave } disabled={this.props.submitting}>{this.props.submitting ? 'Saving' : 'Save'}</button>
      </form>
    );
  }
}

export default PartForm;
