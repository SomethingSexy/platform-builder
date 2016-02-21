import React, { Component, PropTypes } from 'react';
import TreeNode from './TreeNode.js';

class TreeView extends Component {
  static propTypes = {
    tree: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    tree: []
  };

  render() {
    const children = [];
    this.props.tree.forEach(node => {
      children.push(<TreeNode key={node._id} data={node} onClick={() => this.props.onClick(node)} />);
    });
    return (
      <ul>
        {children}
      </ul>
    );
  }
}

export default TreeView;
