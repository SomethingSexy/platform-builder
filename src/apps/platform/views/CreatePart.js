import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import AddPartForm from '../components/platform/AddPartForm.js';
import * as PlatformActions  from '../../../common/actions/platform.js';
import { Link } from 'react-router';

class CreatePart extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      platform: PropTypes.object.isRequired,
      part: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const returnLink = '/platform/' + this.props.platform._id + '/build';
    return (
      <div>
        <h3>Create New Part</h3>
        <Link to={returnLink}>Return to Platform</Link>
        <AddPartForm form={this.props.part} onSave={this.handleSave.bind(this)} />
      </div>
    );
  }

  static get needs() {
    return [PlatformActions.fetchPlatform];
  }

  handleSave(model) {
    this.props.dispatch(PlatformActions.createPartAndSavePlatform(Object.assign({}, model)));
  }
}

function select(state, ownProps) {
  return {
    platform: state.platformsById[ownProps.params.platformId || state.workingPlatformId],
    // something like this?
    part: {
      _createdPlatformId: ownProps.params.platformId || state.workingPlatformId
    }
  };
}

// not sure what this would all need yet
export default connect(select)(CreatePart);
