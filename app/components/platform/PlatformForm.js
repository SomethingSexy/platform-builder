import React, { Component, PropTypes } from 'react';
import TextInput from '../common/form/TextInput';
import Button from '../common/form/Button';

class PlatformForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Hello!'};
  }

  render() {
    const value = this.state.value;
    return (
      <form>
        <TextInput label="Name" onChange={this.handleNameChange} />
        <Button text="Save" onButtonClick={this.handleSave} />
      </form>
    );
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSave(event) {
    console.log(event);

  }
}

PlatformForm.propTypes = {};

export default PlatformForm;
