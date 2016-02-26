import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// not sure what this will all do yet but
class PlatformHandler extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(PlatformHandler);
