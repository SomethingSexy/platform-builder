import React from 'react';
import { Router, Route, Link } from 'react-router';

// not sure what this will all do yet but
export default React.createClass({
  render() {
    return (
      <div>
        <h2>Create a new platform</h2>
        {this.props.children}
      </div>
    );
  }
});
