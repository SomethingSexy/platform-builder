import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PlatformForm from '../components/platform/PlatformForm.js';
import { fetchPlatform, removePartAndSavePlatform, savePlatform, activatePlatform } from '../../../common/actions/platform.js';
import { getCategories } from '../../../common/actions/categories.js';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class UpdatePlatform extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    platform: PropTypes.object.isRequired
  }

  static get needs() {
    return [getCategories, fetchPlatform];
  }

  constructor(props) {
    super(props);
    this.handleActivateBind = this.handleActivate.bind(this);
    this.handleDeactivateBind = this.handleDeactivate.bind(this);
  }

  // this will be handled here because we might have
  // to do some special handling with it
  handleRemovePart(partId) {
    // call to delete the part, which will remove it from
    this.props.dispatch(removePartAndSavePlatform(partId));
  }

  handleEditPart(partId) {
    browserHistory.push(`/platform/${this.props.platform._id}/part/${partId}`);
  }

  handleSave(model) {
    this.props.dispatch(savePlatform(Object.assign({}, model)));
  }

  handleActivate() {
    this.props.dispatch(activatePlatform(this.props.platform._id));
  }

  handleDeactivate() {

  }

  render() {
    const props = {
      form: this.props.platform,
      onSave: this.handleSave.bind(this),
      onRemovePart: this.handleRemovePart.bind(this),
      onEditPart: this.handleEditPart.bind(this),
      parts: this.props.platform.parts,
      onActivate: this.handleActivateBind,
      onDeactive: this.handleActivateBind
    };

    return (
      <div>
        <PlatformForm {...props} />
      </div>
    );
  }
}

function select(state, ownProps) {
  return {
    categories: state.categories.categories,
    platform: state.platformsById[ownProps.params.platformId || state.workingPlatformId]
    // parts: state.partsById
  };
}

// not sure what this would all need yet
export default connect(select)(UpdatePlatform);
