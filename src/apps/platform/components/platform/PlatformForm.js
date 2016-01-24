import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../common/components/form/fields/TextInput.js';
import Textarea from '../../../../common/components/form/fields/Textarea.js';
import Static from '../../../../common/components/form/fields/Static.js';

// I think we are probably better making this a dumb component
class PlatformForm extends Component {
  static get propTypes() {
    return {
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
      <div>
        <Static label="Category" value={this.props.platform.category.name}/>
        <TextInput name="name" label="Name" />
        <Textarea name="description" label="Description" />
      </div>
    );
  }
}

export default PlatformForm;
