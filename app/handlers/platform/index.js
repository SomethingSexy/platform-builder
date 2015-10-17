import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../../components/platform/PlatformForm';

// not sure what this will all do yet but
class PlatformHandler extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h2>Create a new platform</h2>
        <PlatformForm />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(PlatformHandler);
