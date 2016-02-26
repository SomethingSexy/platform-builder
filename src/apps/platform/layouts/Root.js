import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Root extends React.Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
      <div className="container">
        <h1>App</h1>
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><a href="/product">Build a Product</a></li>
          <li><Link to="/platform/create">Add Platform</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    );
  }
}

export default Root;
