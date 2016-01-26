import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../components/platform/PlatformForm.js';
import * as PlatformActions  from '../actions/platform.js';
import * as CategoryActions  from '../actions/categories.js';

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
  }

  render() {
    return (
      <div>
        <PlatformForm form={this.props.platform} onSave={this.handleSave.bind(this)} />
      </div>
    );
  }

  static get needs() {
    return [CategoryActions.getCategories, PlatformActions.fetchPlatform];
  }

  handleSave(model) {
    console.log(model);
    // the platform is the data coming from the form, merge it with the current
    // platform data we have
    this.props.dispatch(PlatformActions.savePlatform(Object.assign({}, model)));
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
