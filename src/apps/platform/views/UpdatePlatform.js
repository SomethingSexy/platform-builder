import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../components/platform/PlatformForm.js';
import * as PlatformActions  from '../../../common/actions/platform.js';
import * as CategoryActions  from '../../../common/actions/categories.js';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class UpdatePlatform extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      categories: PropTypes.array.isRequired,
      platform: PropTypes.object.isRequired,
      parts: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PlatformForm form={this.props.platform} onSave={this.handleSave.bind(this)} onRemovePart={this.handleRemovePart.bind(this)} parts={this.props.parts} />
      </div>
    );
  }

  static get needs() {
    return [CategoryActions.getCategories, PlatformActions.fetchPlatform];
  }

  // this will be handled here because we might have
  // to do some special handling with it
  handleRemovePart(partId) {
    console.log(partId);
    // call to delete the part, which will remove it from
    this.props.dispatch(PlatformActions.removePartAndSavePlatform(partId));
  }

  handleSave(model) {
    this.props.dispatch(PlatformActions.savePlatform(Object.assign({}, model)));
  }
}

function select(state) {
  return {
    categories: state.categories.categories,
    platform: state.platformsById[state.workingPlatformId],
    parts: state.partsById
  };
}

// not sure what this would all need yet
export default connect(select)(UpdatePlatform);
