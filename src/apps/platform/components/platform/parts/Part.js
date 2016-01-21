import React, { Component, PropTypes } from 'react';

class Part extends Component {
  static get propTypes() {
    return {
      data: PropTypes.object.isRequired
    };
  }

  render() {
    return (
      <li>{this.props.data.name}</li>
    );
  }
}

export default Part;
