import React, {Component} from 'react';
import PlatformForm from '../../components/platform/PlatformForm';

// not sure what this will all do yet but
class PlatformHandler extends Component {
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

export default PlatformHandler;
