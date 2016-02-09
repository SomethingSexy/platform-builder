import React, { Component, PropTypes } from 'react';
import Category from './Category.js';

class Categories extends Component {
  static get propTypes() {
    return {
      categories: PropTypes.array.isRequired,
      handleSelect: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <ul>
        {this.props.categories.map((result) => {
          return <Category key={result.id} category={result} onClick={() => this.props.handleSelect(result)}/>;
        })}
      </ul>
    );
  }
}

export default Categories;
