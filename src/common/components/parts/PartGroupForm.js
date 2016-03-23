import React, { Component, PropTypes } from 'react';
import Button from '../Button.js';
import { reduxForm } from 'redux-form';

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required';
    }
    return errors;
  }, {});

export const validate = values => {
  const errors = requireFields('name', 'description')(values);
  return errors;
};

export const fields = [
  'name',
  'description'
];

class PartGroupForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired, // callback for dispatching
    handleSubmit: PropTypes.func.isRequired, // this comes from redux form
    submitting: PropTypes.bool
  }

  render() {
    const {
      fields: { name, description },
      handleSubmit,
      submitting
      } = this.props;
    return (
      <div>
        <h5>Create Part Group</h5>
        <p>A part group is a way to organize parts into logical groupings.  Groupings can contain parts or other groupings.  Products can also be created from groupings.</p>
        <hr />
        <form onSubmit={handleSubmit(this.props.onSave)}>
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
          <div className="btn-group">
            <button type="input" className="btn btn-primary" onClick={ this.handleSave } disabled={submitting}>{submitting ? 'Saving' : 'Save'}</button>
            <Button buttonClass="btn-secondary" onClick={this.props.onCancel}>Cancel</Button>
        </div>
        </form>
      </div>
    );
  }
}

PartGroupForm = reduxForm({
  form: 'partGroup',
  fields,
  validate
})(PartGroupForm);

export default PartGroupForm;
