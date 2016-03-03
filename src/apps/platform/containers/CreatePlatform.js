import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as PlatformActions from '../../../common/actions/platform.js';
import * as CategoryActions from '../../../common/actions/categories.js';
import Categories from '../../../common/components/Categories.js';
import Button from '../../../common/components/Button.js';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class CreatePlatform extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
  }

  static get needs() {
    return [CategoryActions.getCategories];
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.buttonClickRoot = this.handleSelect.bind(this, null);
    this.handleSelectCategory = this.handleSelect.bind(this);
  }

  // handles selecting the category that this new platform will be added too
  handleSelect(category) {
    // can add a root platform
    this.props.dispatch(PlatformActions.createPlatform(category ? { _parentCategory: category._id } : {}));
  }
  render() {
    if (!this.props.categories) {
      return null;
    }

    return (
      <div>
        <h2>Create a new platform</h2>
        <p>Select what you are trying to create</p>
        <Button onClick={this.buttonClickRoot}>Root Platform</Button>
        <Categories categories={this.props.categories} handleSelect={this.handleSelectCategory} />
      </div>
    );
  }
}

function select(state) {
  return {
    categories: state.categories.categories
  };
}


// not sure what this would all need yet
export default connect(select)(CreatePlatform);
