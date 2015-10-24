import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import PlatformForm from '../../components/platform/PlatformForm';
import * as PlatformActions  from '../../actions/platform';
import Parts from '../../components/platform/Parts';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class CreatePlatform extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      parts: []
    };
  }

  render() {
    return (
      <div>
        <PlatformForm handleSave={this.handleSave.bind(this)} />
        <h3>Parts</h3>
        <Parts
          parts={this.state.parts}
          // onTodoClick={index =>
          //   dispatch(completeTodo(index))
          // }
          />
      </div>
    );
  }

  static get needs() {
    return [PlatformActions.getCategories];
  }

  handleSave(platform) {
    this.props.dispatch(PlatformActions.createPlatform(platform));
  }
}

// not sure what this would all need yet
export default connect()(CreatePlatform);
