import React, {Component,  PropTypes} from 'react';

// Will use this as a global list so we can maintain the data but this will probably
// get turned into showing platforms as categories or an admin list
class PlatformListItem extends Component {
  static get propTypes() {
    return {
      data: PropTypes.object.isRequired,
      onSelect: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.handleOnSelect = () => {
      this.props.onSelect(this.props.data._id);
    };
  }

  render() {
    // TODO: Need to work on this piece, I want to keep it an anchor tag but I need to set the working platform id unfortunately.
    // Might be able to use https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replacestate-callback onEnter to handle this
    return (
      <li><span><a href="javascript(void);" onClick={this.handleOnSelect}>{this.props.data._id}</a></span><span>{this.props.data.name}</span></li>
    );
  }
}

export default PlatformListItem;
