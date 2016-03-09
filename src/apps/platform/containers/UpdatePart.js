import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PartForm from './PartForm.js';
import * as PlatformActions from '../../../common/actions/platform.js';
import { Link } from 'react-router';
// import { actions } from 'react-redux-form';

class UpdatePart extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    platform: PropTypes.object.isRequired,
    part: PropTypes.object.isRequired,
    workingPartForm: PropTypes.object.isRequired
  }

  static get needs() {
    return [PlatformActions.fetchPlatform];
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
  }

  handleSave(model) {
    this.props.dispatch(PlatformActions.savePart({...model}));
  }

  handleAddField() {
    this.props.dispatch(actions.push('platforms.workingPart.fields', { options: [] }));
  }

  handleAddFieldOption(fieldIndex) {
    this.props.dispatch(actions.push(`platforms.workingPart.fields[${fieldIndex}].options`));
  }    

  render() {
    const returnLink = `/platform/${this.props.platform._id}/build`;
    return (
      <div>
        <h3>Create New Part</h3>
        <Link to={returnLink}>Return to Platform</Link>
        <PartForm part={this.props.part} partForm={this.props.workingPartForm} onSave={this.handleSave} onFieldAdd={this.handleAddField} />
      </div>
    );
  }
}

function select(state, ownProps) {
  const platform = state.platforms.platformsById[ownProps.params.platformId];
  const part = state.platforms.workingPart;

  return {
    platform,
    part,
    workingPartForm: state.platforms.workingPartForm
  };
}

// not sure what this would all need yet
export default connect(select)(UpdatePart);
