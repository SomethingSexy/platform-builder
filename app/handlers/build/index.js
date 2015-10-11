import React from 'react';
import { Router, Route, Link } from 'react-router';

// not sure what this will all do yet but
export default React.createClass({
  render() {
    return (
      <div>
        <h2>Build a new </h2>
        {this.props.children}
      </div>
    );
  }
});
