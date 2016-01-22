import React, { Component, PropTypes } from 'react';
import Checkboxes from '../../../../common/components/form/fields/Checkboxes.js';

// This will handle standard "static" configuration that is supported by the app
class ConfigurationForm extends Component {
  static get propTypes() {
    return {
      onConfigurationChange: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
  }

  render() {
    const checkboxes = [{
      label: 'Allow company',
      value: 'true',
      selectedValue: this.state.showCompany,
      name: 'showCompany'
    }, {
      label: 'Allow brands',
      value: 'true',
      selectedValue: this.state.showBrands,
      name: 'showBrands'
    }, {
      label: 'Allow people',
      value: 'true',
      selectedValue: this.state.showPeople,
      name: 'showPeople'
    }, {
      label: 'Allow tags',
      value: 'true',
      selectedValue: this.state.showTags,
      name: 'showTags'
    }, {
      label: 'Allow photos',
      value: 'true',
      selectedValue: this.state.showPhotos,
      name: 'showPhotos'
    }, {
      label: 'Allow transactions',
      value: 'true',
      selectedValue: this.state.showTransactions,
      name: 'showTransactions'
    }];
    return (
      <Checkboxes label="Configuration" checkboxes={checkboxes} onChange={this.handleConfigurationChange.bind(this)}/>
    );
  }

  handleConfigurationChange(value, name) {
    this.setState({[name]: value});
    this.props.onConfigurationChange({[name]: value});
  }
}

export default ConfigurationForm;
