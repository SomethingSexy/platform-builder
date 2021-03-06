import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ProductActions  from '../../../common/actions/product.js';
import * as CategoryActions  from '../../../common/actions/categories.js';
import Categories from '../../../common/components/Categories.js';
import Button from '../../../common/components/Button.js';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class CreateProduct extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      categories: PropTypes.array.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.buttonClickMass = this.handleSelectType.bind(this, 'mass');
    this.buttonClickPersonal = this.handleSelectType.bind(this, 'personal');
  }

  render() {
    // if (!this.props.categories) {
    //   return null;
    // }
    // Prompt user to select Mass-Produced vs Personal Product
    // Then optionally let them select a platform (required if Mass-produced)

    if (!this.state.type) {
      return (
        <div>
          <Button onButtonClick={this.buttonClickMass}>Mass-Produced Product</Button> <Button onClick={this.buttonClickPersonal}>Personal Product</Button>
        </div>
      );
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

  handleSelectType(type) {
    this.setState({
      type
    });
  }

  // handles selecting the category that this new platform will be added too
  handleSelect(category) {
    const type = this.state.type;
    // do I really need to set state here?
    this.props.dispatch(ProductActions.createProduct({
      category,
      type
    }));
  }
}

function select(state) {
  return {
    categories: state.categories.categories
  };
}


// not sure what this would all need yet
export default connect(select)(CreateProduct);
