import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../components/platform/PlatformForm.js';
import * as PlatformActions  from '../actions/platform.js';
import * as CategoryActions  from '../actions/categories.js';
import ConfigurationForm from '../components/platform/ConfigurationForm.js';
import AddCustomField from '../components/platform/fields/AddCustomField';
import Button from '../../../common/components/Button.js';
import merge from 'merge';
import update from 'react-addons-update';
import Form from '../../../common/components/form/Form.js';


// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class UpdatePlatform extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      categories: PropTypes.array.isRequired,
      platform: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = merge({
      parts: [],
      configuration: { fields: []}
    }, this.props.platform);
  }

  render() {
    // For the model, we really only need to set the deep properties and arrays.  If I create
    // a multi-component (what AddcustomField would be) or some sort of deepComponent, than that
    // could set the model as it gets created
    return (
      <Form onSave={this.handleSave.bind(this)} model={ {configuration: {fields: []}} }>
        <PlatformForm platform={this.state} />
        <ConfigurationForm platform={this.state}/>
        <Button text="Add Field" onButtonClick={this.handleAddField.bind(this)}/>
        {this.state.configuration.fields.map((result, index) => {
          return <AddCustomField key={index} index={index} field="configuration.fields" {...result} />;
        })}
      </Form>
    );
  }

  static get needs() {
    return [CategoryActions.getCategories, PlatformActions.fetchPlatform];
  }

  handleAddField() {
    this.setState({
      configuration: {
        fields: update(this.state.configuration.fields, {$push: [{}]})
      }
    });
  }

  handleSave(form) {
    console.log(form);
    // the platform is the data coming from the form, merge it with the current
    // platform data we have
    this.props.dispatch(PlatformActions.savePlatform(Object.assign({}, this.state)));
  }
}

function select(state) {
  return {
    categories: state.categories.categories,
    platform: state.platformsById[state.workingPlatformId]
  };
}


// not sure what this would all need yet
export default connect(select)(UpdatePlatform);
