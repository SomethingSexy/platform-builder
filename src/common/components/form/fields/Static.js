import React, { Component, PropTypes } from 'react';

class StaticField extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool
    ])
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
