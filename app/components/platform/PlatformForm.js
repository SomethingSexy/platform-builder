import React, { Component, PropTypes } from 'react';
import TextInput from '../common/form/TextInput';
import Button from '../common/form/Button';
import * as PlatformActions  from '../../actions/platform';


// smart component, might want to organize this better 
class PlatformForm extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {value: 'Hello!'};
  }

  render() {
    const value = this.state.value;
    return (
      <form>
        <TextInput label="Name" onChange={this.handleNameChange} />
        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
      </form>
    );
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSave(event) {
    console.log(event);
    this.props.dispatch(PlatformActions.createPlatform({}));
  }
}

export default PlatformForm;
