import React, { Component, PropTypes } from 'react';
import Checkbox from '../common/form/fields/Checkbox.js';

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
    return (
      <form>
        <Checkbox label="Allow company" value="true" selectedValue={this.state.showCompany} name="showCompany" onChange={this.handleConfigurationChange.bind(this)} />
        <Checkbox label="Allow brands" value="true" selectedValue={this.state.showBrands} name="showBrands" onChange={this.handleConfigurationChange.bind(this)} />
        <Checkbox label="Allow people" value="true" selectedValue={this.state.showPeople} name="showPeople" onChange={this.handleConfigurationChange.bind(this)} />
        <Checkbox label="Allow tags" value="true" selectedValue={this.state.showTags} name="showTags" onChange={this.handleConfigurationChange.bind(this)} />
        <Checkbox label="Allow photos" value="true" selectedValue={this.state.showPhotos} name="showPhotos" onChange={this.handleConfigurationChange.bind(this)} />
        <Checkbox label="Allow transactions" value="true" selectedValue={this.state.showTransactions} name="showTransactions" onChange={this.handleConfigurationChange.bind(this)} />
      </form>
    );
  }

  handleConfigurationChange(value, name) {
    this.setState({[name]: value});
    this.props.onConfigurationChange({[name]: value});
  }
}

export default ConfigurationForm;
