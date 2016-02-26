import React, {Component,  PropTypes} from 'react';
import _find from 'lodash.find';
import {connect} from 'react-redux';
import AddPartForm from '../components/platform/AddPartForm.js';
import * as PlatformActions  from '../../../common/actions/platform.js';
import { Link } from 'react-router';

class UpdatePart extends Component {
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
        <h3>Modify Part</h3>
        <Link to={returnLink}>Return to Platform</Link>
        <AddPartForm form={this.props.part} onSave={this.handleSave.bind(this)} />
      </div>
    );
  }

  static get needs() {
    return [PlatformActions.fetchPlatform];
  }

  handleSave(model) {
    this.props.dispatch(PlatformActions.savePart(Object.assign({}, model)));
  }
}

function select(state, ownProps) {
  const platform = state.platformsById[ownProps.params.platformId];
  const part = _find(platform.parts, { _id: ownProps.params.partId});

  return {
    platform,
    part
  };
}

// not sure what this would all need yet
export default connect(select)(UpdatePart);
