import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PartForm, { validate, fields } from '../components/PartForm.js';
import * as PlatformActions from '../../../common/actions/platform.js';
import { Link } from 'react-router';
import { reduxForm, addArrayValue } from 'redux-form';

class CreatePart extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    platform: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool
  }

  static get needs() {
    return [PlatformActions.fetchPlatform];
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(model) {
    this.props.dispatch(PlatformActions.createPartAndSavePlatform({ ...model, _createdPlatformId: this.props.platform._id }));
  }

  render() {
    const returnLink = `/platform/${this.props.platform._id}/build`;
    return (
      <div>
        <h3>Create New Part</h3>
        <Link to={returnLink}>Return to Platform</Link>
        <PartForm {...this.props.fields} handleSubmit={this.props.handleSubmit(this.handleSave)} submitting={this.props.submitting} />
      </div>
    );
  }
}

function select(state, ownProps) {
  const platform = state.platforms.platformsById[ownProps.params.platformId];

  return {
    platform
  };
}

CreatePart = reduxForm({
  form: 'part',
  fields,
  validate
}, null, {
  addValue: addArrayValue
})(CreatePart);

// not sure what this would all need yet
export default connect(select)(CreatePart);
