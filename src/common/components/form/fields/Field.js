import React, { Component, PropTypes } from 'react';
import _get from 'lodash.get';

export default (ComposedComponent, options) => {
  class Field extends Component {
    static get propTypes() {
      return {
        children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node
        ]),
        name: PropTypes.string.isRequired
      };
    }

    static get contextTypes() {
      return {
        form: PropTypes.object.isRequired
      };
    }

    constructor(props) {
      super(props);
    }

    render() {
      const value = _get(this.context.form, this.props.name);
      return (
        <ComposedComponent {...this.props} value={value} />
      );
    }
  }

  return Field;
};
