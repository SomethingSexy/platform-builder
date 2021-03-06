import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  fetchPlatform,
  removePartAndSavePlatform,
  savePlatform,
  activatePlatform,
  addPartGroup,
  addPartToGroup } from '../../../common/actions/platform.js';
import { getCategories } from '../../../common/actions/categories.js';
import Parts from '../../../common/components/parts/Parts.js';
import PlatformForm from '../components/PlatformForm.js';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class UpdatePlatform extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    platform: PropTypes.object.isRequired
  }

  static get needs() {
    return [getCategories, fetchPlatform];
  }

  constructor(props) {
    super(props);
    this.handleActivate = this.handleActivate.bind(this);
    this.handleDeactivate = this.handleDeactivate.bind(this);
    this.handleAddPartGroup = this.handleAddPartGroup.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditPart = this.handleEditPart.bind(this);
    this.handleRemovePart = this.handleRemovePart.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectPartForGroup = this.handleSelectPartForGroup.bind(this);
  }

  handleRemovePart(partId) {
    this.props.dispatch(removePartAndSavePlatform(this.props.platform._id, partId));
  }

  handleEditPart(partId) {
    browserHistory.push(`/platform/${this.props.platform._id}/part/${partId}`);
  }

  handleSave(platform) {
    this.props.dispatch(savePlatform({ ...platform, _id: this.props.platform._id }));
  }

  handleActivate() {
    this.props.dispatch(activatePlatform(this.props.platform._id));
  }

  handleDeactivate() {

  }

  handleAddPartGroup(partGroup) {
    this.props.dispatch(addPartGroup(this.props.platform._id, partGroup));
  }

  handleSelectPartForGroup(partGroupdId, partId) {
    this.props.dispatch(addPartToGroup(this.props.platform._id, partGroupdId, partId));
  }

  handleSubmit() {
    this.refs.form.submit();
  }

  render() {
    const partsProps = {
      platformId: this.props.platform._id,
      parts: this.props.platform.parts,
      partGroups: this.props.platform.partGroups,
      onRemovePart: this.handleRemovePart,
      onEditPart: this.handleEditPart,
      onAddPartGroup: this.handleAddPartGroup,
      onSelectPartForGroup: this.handleSelectPartForGroup
    };

    return (
      <div>
        <PlatformForm platform={this.props.platform} onSubmit={this.handleSave} ref="form" />
        <Parts {...partsProps} />
        <div className="btn-group">
          <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>Save</button>
          <button className="btn btn-secondary" onClick={this.handleActivate}>Activate</button>
        </div>
      </div>
    );
  }
}

function select(state, ownProps) {
  return {
    platform: state.platforms.platformsById[ownProps.params.platformId]
  };
}

// not sure what this would all need yet
export default connect(select)(UpdatePlatform);
