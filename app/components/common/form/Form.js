import React, { Component, PropTypes } from 'react';
import Button from './Button';

class Form extends Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
      ]),
      onSave: PropTypes.func.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    // bind the function on this because it seems to lose its context
    return {
      attachToForm: this.attachToForm.bind(this),
      detachFromForm: this.detachFromForm.bind(this),
      onFormFieldChange: this.handleFormFieldChange.bind(this)
    };
  }

  componentWillMount() {
    // Map of inputs on the form
    this.inputs = {};
    // now register all of the inputs for this form
    this.registerInputs(this.props.children);
    console.log(this.inputs);
  }

  render() {
    return (
      <form>
        {this.props.children}
        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
      </form>
    );
  }

  registerInputs(children) {
    // A React helper for traversing children
    React.Children.forEach(children, (child) => {
      // We do a simple check for "name" on the child, which indicates it is an input.
      // You might consider doing a better check though
      if (child.props && child.props.name) {
        // We attach a method for the input to register itself to the form
        // child.props.attachToForm = this.attachToForm;
        // We attach a method for the input to detach itself from the form
        // child.props.detachFromForm = this.detachFromForm;
      }
      // If the child has its own children, traverse through them also...
      // in the search for inputs
      if (child.props && child.props.children) {
        this.registerInputs(child.props.children);
      }
    }.bind(this));
  }

  // All methods defined are bound to the component by React JS, so it is safe to use "this"
  // even though we did not bind it. We add the input component to our inputs map
  attachToForm(component) {
    this.inputs[component.props.name] = component;
  }

  detachFromForm(component) {
    delete this.inputs[component.props.name];
  }

  handleFormFieldChange(name, value) {
    this.setState({[name]: value});
    console.log(this.state);
  }

  handleSave(event) {
    event.stopPropagation();
    // need to validate
    const isValid = this.validateForm();

    if (isValid) {
      this.props.onSave(this.state);
    } else {

    }

    // if valid call outside method

    // else if not valid display errors
  }

  validateForm() {
    // loop through all of our inputs, we need to validate each one
    Object.keys(this.inputs).forEach((name) => {
      // grab the component
      const component = this.inputs[name];

      // grab the value
      const value = this.state[name];

      // validate the value
      this.validateField(component, value);
    });
  }

  validateField(component, value) {

  }
}

Form.childContextTypes = {
  attachToForm: PropTypes.func.isRequired,
  detachFromForm: PropTypes.func.isRequired,
  onFormFieldChange: PropTypes.func.isRequired
};

export default Form;
