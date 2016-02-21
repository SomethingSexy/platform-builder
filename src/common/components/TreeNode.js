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
        children.push(<TreeNode key={node._id} data={node} onClick={this.props.onClick}/>);
      });
    }

    return (
      <li><span onClick={this.handleOnClick.bind(this)}>{this.props.data.name}</span><ul>{children}</ul></li>
    );
  }

  handleOnClick() {
    this.props.onClick(this.props.data);
  }
}

export default TreeNode;
