import React, { Component, PropTypes } from 'react';
import CustomField from './CustomField';
import AddCustomField from './AddCustomField';
import Button from '../common/form/Button';

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

  onClick() {
    this.setState({ showAdd: this.state.showAdd ? false : true });
  }

  render() {
    return (
      <div>
        <h4>Fields</h4>
        <Button text="Add Field" onButtonClick={this.onClick.bind(this)} />
        <ul>
          {this.props.fields.map((result) => {
            return <CustomField key={result.id} data={result}/>;
          })}
        </ul>
        { this.state.showAdd ? <AddCustomField /> : null }
      </div>
    );
  }

}

export default CustomFields;
