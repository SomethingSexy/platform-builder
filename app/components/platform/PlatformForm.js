import React, { Component, PropTypes } from 'react';
import TextInput from '../common/form/TextInput';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';

// I think we are probably better making this a dumb component
class PlatformForm extends Component {
  static get propTypes() {
    return {
      handleSave: PropTypes.func.isRequired,
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
        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
      </form>
    );
  }

  handleNameChange(value) {
    this.setState({name: value});
  }

  handleDescriptionChange(value) {
    this.setState({description: value});
  }

  handleSave(event) {
    console.log(event);
    this.props.handleSave(this.state);
  }
}

export default PlatformForm;
