import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import { fetchPlatforms }  from '../../../common/actions/platform.js';
import PlatformListItem from '../components/platform/PlatformListItem.js';

// Will use this as a global list so we can maintain the data but this will probably
// get turned into showing platforms as categories or an admin list
class PlatformList extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      platforms: PropTypes.object.isRequired
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  render() {
    const platforms = this.props.platforms;
    const platformKeys = Object.keys(platforms);
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Platforms</h2>
          {platformKeys.length === 0 ? <p>No platforms have been added.</p> : null}
          {platformKeys.length > 0 ?  <ul> {platformKeys.map((key) => { return <PlatformListItem key={platforms[key]._id} data={platforms[key]} onSelect={this.handleOnSelect}/>; })} </ul> : null}
        </div>
      </div>
    );
  }

  static get needs() {
    return [fetchPlatforms];
  }

  handleOnSelect (id) {
    console.log(id);
  }
}

function select(state) {
  return {
    platforms: state.platformsById
  };
}

export default connect(select)(PlatformList);
