import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../common/components/form/fields/TextInput.js';
import repeatable from '../../../../common/components/form/Repeatable.js';
import Button from '../../../../common/components/Button.js';


class AddCustomFieldOptions extends Component {
  static propTypes = {
    field: PropTypes.string,
    index: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.onRemove(this.props.index);
  }

  render() {
    const valueName = `${this.props.field}.type`;
    const labelName = `${this.props.field}.label`;
    return (
      <fieldset className="form-inline">
        <TextInput label="Label" name={labelName} required />
        <TextInput label="Value" name={valueName} required />
        <Button onClick={this.handleRemove}>Remove</Button>
      </fieldset>
    );
  }
}

export default repeatable(AddCustomFieldOptions);
