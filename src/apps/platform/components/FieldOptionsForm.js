import React, { Component, PropTypes } from 'react';

class FieldOptionsForm extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string
  }

  render() {
    const { value, label } = this.props;
    return (
      <div>
        <fieldset className="form-group">
          <label htmlFor="">Label</label>
          <input type="text" className="form-control" {...label} />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Value</label>
          <input type="text" className="form-control" {...value} />
        </fieldset>
      </div>
    );
  }
}

export default FieldOptionsForm;
