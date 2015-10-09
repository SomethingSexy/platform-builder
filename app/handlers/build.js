import React from 'react';
import { Router, Route, Link } from 'react-router';

// not sure what this will all do yet but
export default React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});
