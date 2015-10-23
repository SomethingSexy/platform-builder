import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../../components/platform/PlatformForm';
import * as PlatformActions  from '../../actions/platform';

// not sure what this will all do yet but
class CreatePlatform extends Component {
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
        <PlatformForm dispatch={this.props.dispatch} handleSave={this.handleSave.bind(this)} />
      </div>
    );
  }

  handleSave(platform) {
    console.log(platform);
    this.props.dispatch(PlatformActions.createPlatform(platform));
  }
}

export default connect()(CreatePlatform);
