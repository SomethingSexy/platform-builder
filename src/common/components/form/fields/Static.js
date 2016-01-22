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
      <div className="form-group row">
        <label className="col-sm-2 form-control-label">{this.props.label}</label>
        <div className="col-sm-10">
          <p className="form-control-static">{this.props.value}</p>
        </div>
      </div>
    );
  }
}

export default StaticField;
