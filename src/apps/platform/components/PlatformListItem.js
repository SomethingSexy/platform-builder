import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Button from '../../../common/components/Button.js';

// Will use this as a global list so we can maintain the data but this will probably
// get turned into showing platforms as categories or an admin list
class PlatformListItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.onRemove(this.props.data._id);
  }

  render() {
    const uri = `/platform/${this.props.data._id}/build`;
    return (
      <li><span><Link to={uri}>{this.props.data._id}</Link></span><span>{this.props.data.name}</span><Button onClick={this.handleRemove}>Remove</Button></li>
    );
  }
}

export default PlatformListItem;
