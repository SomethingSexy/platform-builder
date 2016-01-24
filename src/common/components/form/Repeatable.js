import React, { Component, PropTypes } from 'react';

export default ComposedComponent => {
  class RepeatableComponent extends Component {
    static get propTypes() {
      return {
        index: PropTypes.number.isRequired,
        field: PropTypes.string.isRequired
      };
    }
    constructor(props) {
      super(props);
    }
    componentDidMount() {

    }
    render() {
      const field = this.props.field + '[' + this.props.index + ']';
      return <ComposedComponent {...this.props} field={field} />;
    }
  }

  return RepeatableComponent;
};
