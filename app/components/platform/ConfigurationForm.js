import React, { Component, PropTypes } from 'react';
import TextInput from '../common/form/TextInput';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';

// I think we are probably better making this a dumb component
class PlatformForm extends Component {
  static get propTypes() {
    return {
      // handleSave: PropTypes.func.isRequired
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

      </form>
    );
  }
}

export default PlatformForm;
