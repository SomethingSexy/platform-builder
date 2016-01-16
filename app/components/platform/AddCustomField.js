import React, { Component, PropTypes } from 'react';
import Select from '../common/form/fields/Select';
import TextInput from '../common/form/fields/TextInput';
import Button from '../common/form/Button';
import Form from '../common/form/Form';

class AddCustomFieldOptions extends Component {
  static get propTypes() {
    return {
      onSave: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {};
  }

  render() {
    //        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
    return (
      <Form onSave={this.handleSave.bind(this)}>
        <TextInput label="Label" name="label" validations={['isRequired']}/>
        <TextInput label="Value" name="value" />
      </Form>
    );
  }

  handleSave(form) {
    console.log(form);
  }
}

class FieldOptions extends Component { // eslint-disable-line react/no-multi-comp
  static get propTypes() {
    return {
      options: PropTypes.array.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {
      options: props.options || []
    };
  }

  onClick() {
    // toggle the adding of an option
    this.setState({ showAdd: this.state.showAdd ? false : true });
  }

  render() {
    return (
      <div>
        <h5>Options</h5>
        <Button text="Add Option" onButtonClick={this.onClick.bind(this)} />
        <ul>
          {this.state.options.map((result) => {
            return <li><span>{result.label}</span> <span>{result.value}</span></li>;
          })}
        </ul>
        {this.state.showAdd ? <AddCustomFieldOptions onSave={this.handleSaveOption.bind(this)}/> : null}
      </div>
    );
  }

  handleSaveOption(option) {
    this.setState((previousState, currentState) => {
      return previousState.options.push(option);
    });
  }
}

const fieldTypes = [{
  label: '',
  value: ''
}, {
  label: 'Select',
  value: 'select'
}, {
  label: 'Textbox',
  value: 'text'
}];

class AddCustomField extends Component { // eslint-disable-line react/no-multi-comp
  static get propTypes() {
    return {
      // data: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {
      options: [] // if the field is a select, options will get stored here
    };
  }

  render() {
    return (
      <div>
        <Form>
          <legend>Custom Field</legend>
          <Select name="type" label="Type" onChange={this.handleTypeChange.bind(this)} options={fieldTypes}/>
          <TextInput name="label" label="Label" onChange={this.handleLabelChange.bind(this)}/>
        </Form>
        {this.state.showAddOptions ? <FieldOptions options={this.state.options}/> : null}
      </div>
    );
  }

  handleTypeChange(type) {
    this.setState({
      showAddOptions: type === 'select' ? true : false,
      type
    });
  }

  handleLabelChange(label) {
    this.setState({
      label
    });
  }

  // this will only be used if select type is selected
  handleAddOption(option) {

  }
}

export default AddCustomField;
