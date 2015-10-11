import React from 'react';
import { Router, Route, Link } from 'react-router';
import TextInput from '../common/form/TextInput';

class PlatformForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'Hello!'};
  }

  render() {
    const value = this.state.value;
    return (
      <TextInput label="Name" onChange={this.handleNameChange}/>
    );
  }

  handleNameChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target.value);
  }
}

export default PlatformForm;
