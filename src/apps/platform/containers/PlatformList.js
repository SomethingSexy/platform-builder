import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPlatforms, removePlatform } from '../../../common/actions/platform.js';
import PlatformListItem from '../components/platform/PlatformListItem.js';

// Will use this as a global list so we can maintain the data but this will probably
// get turned into showing platforms as categories or an admin list
class PlatformList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    platforms: PropTypes.object.isRequired
  }

  static get needs() {
    return [fetchPlatforms];
  }

  constructor(props) {
    super(props);
    this.handleOnRemove = this.handleOnRemove.bind(this);
  }

  handleOnRemove(id) {
    this.props.dispatch(removePlatform(id));
  }

  render() {
    const platforms = this.props.platforms;
    const platformKeys = Object.keys(platforms);
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Platforms</h2>
          {platformKeys.length === 0 ? <p>No platforms have been added.</p> : null}
          {platformKeys.length > 0 ? <ul> {platformKeys.map((key) => <PlatformListItem key={platforms[key]._id} data={platforms[key]} onRemove={this.handleOnRemove} />)} </ul> : null}
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    platforms: state.platforms.platformsById
  };
}

export default connect(select)(PlatformList);
