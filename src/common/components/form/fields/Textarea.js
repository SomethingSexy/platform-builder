import React, { PropTypes } from 'react';
import Input from './Input.js';

class Textarea extends Input {
  static get propTypes() {
    return Object.assign({
      label: PropTypes.string.isRequired,
      value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool
      ])
    }, Input.propTypes);
  }

  constructor(props) {
    super(props);
    this.state = props.value || {};
  }

  render() {
    const value = this.state.value;
    return (
      <div className ="form-group row">
        <label className="col-sm-2 form-control-label" htmlFor="">{this.props.label}</label>
        <div className="col-sm-10">
          <textarea type="email" className ="form-control" id="" placeholder="" value={value} onChange={this.handleChange.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Textarea;