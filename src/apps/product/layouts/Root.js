import React from 'react';
import { Link } from 'react-router';

// Then we delete a bunch of code from App and
// add some <Link> elements...
export default React.createClass({
  render() {
    return (
      <div className="container">
        <h1>App</h1>
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><Link to="/product">Build a Product</Link></li>
          <li><a href="/platform">Add Platform</a></li>
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
