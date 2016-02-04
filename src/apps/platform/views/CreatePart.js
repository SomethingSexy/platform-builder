import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import AddPartForm from '../components/platform/parts/AddPartForm.js';
import * as PlatformActions  from '../actions/platform.js';
import * as PartActions  from '../actions/part.js';
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
    const returnLink = '/platform/' + this.props.platform.id + '/build';
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
    console.log(model);
  }
}

function select(state) {
  return {
    platform: state.platformsById[state.workingPlatformId],
    // something like this?
    part: {
      createdPlatformId: state.workingPlatformId
    }
  };
}

// not sure what this would all need yet
export default connect(select)(CreatePart);
