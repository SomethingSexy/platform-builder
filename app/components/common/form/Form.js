import React, { Component, PropTypes } from 'react';

class Form extends Component {
  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        PropTypes.arrayOf(React.PropTypes.node),
        PropTypes.node
      ])
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        {this.props.children}
        <button type="submit">Submit</button>
      </form>
    );
  }
}
export default Form;
