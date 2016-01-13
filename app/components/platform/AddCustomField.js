import React, { Component, PropTypes } from 'react';
import Select from '../common/form/Select';

class AddCustomField extends Component {
  static get propTypes() {
    return {
      // data: PropTypes.object.isRequired
    };
  }

  render() {
    return (
      <form>
        <legend>Custom Field</legend>
        <Select options={[{label: 'balls', value: 'stuff'}]}/>
      </form>
    );
  }
}

export default AddCustomField;
