import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import * as PlatformActions  from '../../../common/actions/platform.js';
import * as CategoryActions  from '../../../common/actions/categories.js';
import Categories from '../../../common/components/Categories.js';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class CreatePlatform extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      categories: PropTypes.array.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.categories) {
      return null;
    }

    return (
      <div>
        <p>Select what you are trying to create</p>
        <Categories categories={this.props.categories} handleSelect={this.handleSelect.bind(this)}/>
      </div>
    );
  }

  static get needs() {
    return [CategoryActions.getCategories];
  }

  // handles selecting the category that this new platform will be added too
  handleSelect(category) {
    this.props.dispatch(PlatformActions.createPlatform({category}));
  }
}

function select(state) {
  return {
    categories: state.categories.categories
  };
}


// not sure what this would all need yet
export default connect(select)(CreatePlatform);
