import React, { Component, PropTypes } from 'react';
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
    fieldKey: PropTypes.string.isRequired,
    partForm: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleAddFieldOption = this.handleAddFieldOption.bind(this);
  }

  handleAddFieldOption() {
    this.props.onFieldAddOption(this.props.index);
  }

  render() {
    const {type, label} = this.props;
    return (
      <div>
        <fieldset className="form-group">
          <label htmlFor="">Type</label>
          <select className="form-control" {...type}>
            {fieldTypes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Label</label>
          <input type="text" className="form-control" {...label} />
        </fieldset>
  
      </div>
    );
  }
}

export default FieldForm;

//      {this.props.field.type === 'select' ? <Button onClick={this.handleAddFieldOption}>Add Option</Button> : ''}