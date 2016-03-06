import React, { Component, PropTypes } from 'react';
import { Field, getField } from 'react-redux-form';

class FieldOptionsForm extends Component {
  static propTypes = {
    platforms: PropTypes.object.isRequired,
    fieldIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  }

  render() {
    return (
      <div>
        <Field model={`platforms.workingPlatform.fields[${this.props.fieldIndex}].options[${this.props.index}].label`}
          validators={{
            required: (val) => val && val.length
          }}
        >
          <fieldset className="form-group">
            <label htmlFor="">Label</label>
            <input type="text" className="form-control" />
          </fieldset>
        </Field>
        <Field model={`platforms.workingPlatform.fields[${this.props.fieldIndex}].options[${this.props.index}].value`}
          validators={{
            required: (val) => val && val.length
          }}
        >
          <fieldset className="form-group">
            <label htmlFor="">Value</label>
            <input type="text" className="form-control" />
          </fieldset>
        </Field>
      </div>
    );
  }
}

export default FieldOptionsForm;
