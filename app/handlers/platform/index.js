import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../../components/platform/PlatformForm';

// not sure what this will all do yet but
class PlatformHandler extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h2>Create a new platform</h2>
        <PlatformForm dispatch={this.props.dispatch} />
        {this.props.children}
      </div>
    );
  }
}

export default connect()(PlatformHandler);
