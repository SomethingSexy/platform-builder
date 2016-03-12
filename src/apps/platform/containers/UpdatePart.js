import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PartForm, { validate, fields } from '../components/PartForm.js';
import * as PlatformActions from '../../../common/actions/platform.js';
import { Link } from 'react-router';
import { reduxForm, addArrayValue } from 'redux-form';
import _find from 'lodash.find';

class UpdatePart extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    platform: PropTypes.object.isRequired,
    part: PropTypes.object.isRequired,
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
    this.props.dispatch(PlatformActions.savePart({ ...this.props.part, ...model }));
  }

  render() {
    const returnLink = `/platform/${this.props.platform._id}/build`;
    return (
      <div>
        <h3>Update Part</h3>
        <Link to={returnLink}>Return to Platform</Link>
        <PartForm {...this.props.fields} handleSubmit={this.props.handleSubmit(this.handleSave)} submitting={this.props.submitting} />
      </div>
    );
  }
}

function select(state, ownProps) {
  const platform = state.platforms.platformsById[ownProps.params.platformId];
  const part = _find(platform.parts, { _id: ownProps.params.partId });

  return {
    platform,
    part
  };
}

UpdatePart = reduxForm({
  form: 'part',
  fields,
  validate
}, (state, ownProps) => {
  return {
    initialValues: _find(state.platforms.platformsById[ownProps.params.platformId].parts, { _id: ownProps.params.partId })
  };
}, {
  addValue: addArrayValue
})(UpdatePart);

// not sure what this would all need yet
export default connect(select)(UpdatePart);
