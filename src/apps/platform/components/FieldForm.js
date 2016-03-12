import React, { Component, PropTypes } from 'react';
import FieldOptionForm from './FieldOptionsForm.js';

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
    type: PropTypes.object,
    label: PropTypes.object,
    options: PropTypes.object
  }

  render() {
    const { type, label, options } = this.props;
    return (
      <div>
        <fieldset className="form-group">
          <label htmlFor="">Type</label>
          <select className="form-control" {...type}>
            {fieldTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          {type.touched && type.error && <span id="helpBlock2" className="help-block">{type.error}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Label</label>
          <input type="text" className="form-control" {...label} />
          {label.touched && label.error && <span id="helpBlock2" className="help-block">{label.error}</span>}
        </fieldset>
        {this.props.type.value === 'select' ? <button type="button" onClick={() => { options.addField(); }}><i /> Add Option</button> : null}
        {this.props.type.value === 'select' ? this.props.options.map((option, index) => <FieldOptionForm key={index} {...option} />) : null}
      </div>
    );
  }
}

export default FieldForm;
