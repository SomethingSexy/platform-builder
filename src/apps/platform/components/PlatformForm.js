import React, { Component, PropTypes } from 'react';
import { reduxForm, addArrayValue } from 'redux-form';
import FieldForm from './FieldForm.js';

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required';
    }
    return errors;
  }, {});

const validateFields = requireFields('type', 'label');
const validate = values => {
  const errors = requireFields('name', 'description')(values);
  errors.fields = values.fields.map(validateFields);

  return errors;
};

const fields = [
  'name',
  'description',
  'showCompany',
  'showBrands',
  'showPeople',
  'showTags',
  'showPhotos',
  'showTransactions',
  'allowAdditionalParts',
  'fields[].type',
  'fields[].label',
  'fields[].options[].label',
  'fields[].options[].value'];

class PlatformForm extends Component {
  static propTypes = {
    platform: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired
  }

  render() {
    const {
      fields: { name, description, fields }
      } = this.props;

    let category;
    if (this.props.platform._parentCategory) {
      category = (
        <div className="form-group">
          <label className="form-control-label">Belongs To</label>
          <p className="form-control-static">{this.props.platform._parentCategory.name}</p>
        </div>
      );
    }

    return (
      <form>
        {category}
        <fieldset className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className ="form-control" {...name} />
          {name.touched && name.error && <span id="helpBlock2" className="help-block">{name.error}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Description</label>
          <textarea className ="form-control" {...description} />
          {description.touched && description.error && <span id="helpBlock2" className="help-block">{description.error}</span>}
        </fieldset>
        <fieldset className="form-group">
          <legend>Configuration</legend>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showCompany}></input>
                Allow company
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showBrands}></input>
                Allow brands
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showPeople}></input>
                Allow people
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showTags}></input>
                Allow tags
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showPhotos}></input>
                Allow photos
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showTransactions}></input>
                Allow transactions
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.allowAdditionalParts}></input>
                Allow additional parts
              </label>
            </div>
        </fieldset>
        <h4>Custom Fields</h4>
          <button className="btn btn-secondary btn-sm" type="button" onClick={() => {
            fields.addField({ options: [] });
          }}
          ><i /> Add Field
          </button>
        {fields.map((field, index) => <FieldForm key={index} {...field} />)}
      </form>
    );
  }
}

PlatformForm = reduxForm({
  form: 'platform',
  fields,
  validate
}, (state, ownProps) => {
  return {
    initialValues: ownProps.platform
  };
}, {
  addValue: addArrayValue
})(PlatformForm);

export default PlatformForm;
