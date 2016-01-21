import React, { Component, PropTypes } from 'react';
import TextInput from '../common/form/fields/TextInput.js';
import Textarea from '../common/form/fields/Textarea.js';
import Form from '../common/form/Form.js';

// I think we are probably better making this a dumb component
class PlatformForm extends Component {
  static get propTypes() {
    return {
      onFormChange: PropTypes.func.isRequired,
      platform: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
  }

  render() {
    return (
      <Form>
        <div>{this.props.platform.category.name}</div>
        <TextInput name="name" label="Name" onChange={this.handleNameChange.bind(this)} />
        <Textarea name="description" label="Description" onChange={this.handleDescriptionChange.bind(this)} />
      </Form>
    );
  }

  handleNameChange(value) {
    const name = {name: value};
    this.setState(name);
    this.props.onFormChange(name);
  }

  handleDescriptionChange(value) {
    const description = {description: value};
    this.setState(description);
    this.props.onFormChange(description);
  }
}

export default PlatformForm;
