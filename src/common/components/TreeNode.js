import React, { Component, PropTypes } from 'react';

class TreeNode extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const children = [];
    if (Array.isArray(this.props.data.children)) {
      this.props.data.children.forEach(node => {
        children.push(<TreeNode key={node._id} data={node} onClick={() => this.props.onClick(node)}/>);
      });
    }

    return (
      <li onClick={this.props.onClick}>{this.props.data.name}<ul>{children}</ul></li>
    );
  }
}

export default TreeNode;
