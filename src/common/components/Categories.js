import React, { Component, PropTypes } from 'react';
import TreeView from './TreeView.js';

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired
  }

  render() {
    return (<TreeView tree={this.props.categories} onClick={this.props.handleSelect.bind(this)}/>);
  }
}

export default Categories;
