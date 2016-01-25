import React, { Component, PropTypes } from 'react';

class StaticField extends Component {
  static get propTypes() {
    return {
      label: PropTypes.string.isRequired,
      value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
      ])
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <p className="form-control-static">{this.props.value}</p>
      </div>
    );
  }
}

export default StaticField;
