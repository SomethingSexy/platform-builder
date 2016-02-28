import React, { Component, PropTypes } from 'react';
import { RouterContext } from 'react-router';

class LoadingContainer extends Component {
  static propTypes = {
    components: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  // now we would switch between showing a loading view or rendering what we
  // get based on based in props
  render() {
    return <RouterContext {...this.props} />;
  }
}

export default LoadingContainer;
