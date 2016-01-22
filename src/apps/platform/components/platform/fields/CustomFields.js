import React, { Component, PropTypes } from 'react';
import CustomField from './CustomField.js';
import AddCustomField from './AddCustomField.js';
import Button from '../../../../../common/components/Button.js';

// I think we are probably better making this a dumb component
class CustomFields extends Component {
  static get propTypes() {
    return {
      onFieldAdd: PropTypes.func.isRequired,
      fields: PropTypes.array.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
  }

  // handler for showing the add field section
  onClick() {
    this.setState({ showAdd: this.state.showAdd ? false : true });
  }

  render() {
    return (
      <div>
        <h4>Fields</h4>
        <ul>
          {this.props.fields.map((result) => {
            return <CustomField key={result.id} data={result}/>;
          })}
        </ul>
        <Button text="Add Field" onButtonClick={this.onClick.bind(this)} />
        { this.state.showAdd ? <div className="row"><div className="col-md-11 col-md-offset-1"><AddCustomField onFieldAdd={this.handleFieldAdd.bind(this)} /></div></div> : null }
      </div>
    );
  }

  handleFieldAdd(field) {
    this.props.onFieldAdd(field);
  }

}

export default CustomFields;
