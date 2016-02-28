import React, { Component, PropTypes } from 'react';
import _get from 'lodash.get';

export default (ComposedComponent) => {
  class Field extends Component {
    static propTypes = {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
      ]),
      name: PropTypes.string.isRequired
    }

    static contextTypes = {
      form: PropTypes.object.isRequired
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
