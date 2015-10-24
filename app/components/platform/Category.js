import React, { Component, PropTypes } from 'react';

class Category extends Component {
  static get propTypes() {
    return {
      category: PropTypes.object.isRequired,
      onClick: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <li onClick={this.props.onClick}>{this.props.category.name}</li>
    );
  }
}

export default Category;
