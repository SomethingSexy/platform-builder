import React from 'react';
import { Link } from 'react-router';

// Then we delete a bunch of code from App and
// add some <Link> elements...
export default React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><Link to="/build/platform">Build</Link></li>
          <li><Link to="/platform">Add Platform</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    );
  }
});
