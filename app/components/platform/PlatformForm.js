import React, { Component, PropTypes } from 'react';
import TextInput from '../common/form/TextInput';
import Textarea from '../common/form/Textarea';

// I think we are probably better making this a dumb component
class PlatformForm extends Component {
  static get propTypes() {
    return {
      handleFormChange: PropTypes.func.isRequired,
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
      <form>
        <div>{this.props.platform.category.name}</div>
        <TextInput label="Name" onChange={this.handleNameChange.bind(this)} />
        <Textarea label="Description" onChange={this.handleDescriptionChange.bind(this)} />
      </form>
    );
  }

  handleNameChange(value) {
    const name = {name: value};
    this.setState(name);
    this.props.handleFormChange(name);
  }

  handleDescriptionChange(value) {
    const description = {description: value};
    this.setState(description);
    this.props.handleFormChange(description);
  }
}

export default PlatformForm;
