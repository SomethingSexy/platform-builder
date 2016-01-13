import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../../components/platform/PlatformForm';
import * as PlatformActions  from '../../actions/platform';
import Parts from '../../components/platform/Parts';
import ConfigurationForm from '../../components/platform/ConfigurationForm';
import ConfigurableFields from '../../components/platform/ConfigurableFields';
import Button from '../../components/common/form/Button';
import merge from 'merge';


// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class CreatePlatform extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      categories: PropTypes.array.isRequired,
      platform: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = merge({}, this.props.platform, {
      parts: []
    });
  }

  render() {
    return (
      <div>
        <PlatformForm platform={this.state} handleFormChange={this.handleFormChange.bind(this)} />
        <h3>Configuration</h3>
        <ConfigurationForm />
        <h4>Fields</h4>
        <ConfigurableFields />
        <h3>Diagram</h3>
        <h4>Parts</h4>
        <Parts
          parts={this.state.parts}
          // onTodoClick={index =>
          //   dispatch(completeTodo(index))
          // }
          />
        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
      </div>
    );
  }

  handleFormChange(platform) {
    this.setState((previousState, currentProps) => {
      // this kind of works but it gives me platform:platform which then adds another "platform" layer
      // return { platform: { ...previousState.platform, platform } };
      return merge({}, previousState.platform, platform);
    });
  }

  handleSave() {
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
export default connect(select)(CreatePlatform);
