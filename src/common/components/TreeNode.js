import React, { Component, PropTypes } from 'react';

class TreeNode extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick(this.props.data);
  }

  render() {
    const children = [];
    if (Array.isArray(this.props.data.children)) {
      this.props.data.children.forEach(node => {
        children.push(<TreeNode key={node._id} data={node} onClick={this.props.onClick} />);
      });
    }

    return (
      <li><span onClick={this.handleOnClick}>{this.props.data.name}</span><ul>{children}</ul></li>
    );
  }
}

export default TreeNode;
