import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';

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
}

export default connect()(PlatformHandler);
