import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import { fetchPlatforms }  from '../../../common/actions/platform.js';

// not sure what this will all do yet but
class PlatformHandler extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Platforms</h2>
      </div>
    );
  }

  static get needs() {
    return [fetchPlatforms];
  }
}

export default connect()(PlatformHandler);
