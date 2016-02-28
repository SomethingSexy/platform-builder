import React, { Component, PropTypes } from 'react';

class Field extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    return (
      <li>{this.props.data.type} - {this.props.data.label}
        <ul>{this.props.data.options.map(result => <li>{result.label} - {result.type}</li>)}</ul>
      </li>
    );
  }
}

export default Field;
