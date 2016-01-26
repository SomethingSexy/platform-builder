import React, { Component, PropTypes } from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import uuid from 'uuid';

export default (ComposedComponent, options) => {
  class Form extends Component {
    static get propTypes() {
      return {
        children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node
        ]),
        form: PropTypes.object
      };
    }

    static get defaultProps() {
      return {
        showSaveButton: true
      };
    }

    constructor(props) {
      console.log(props);
      super(props);
      this.state = {};
      if (options.model) {
        this.model = Object.assign({}, options.model, this.props.form);
      }
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
    }

    render() {
      return (
        <form>
          <ComposedComponent {...this.props} form={this.model} validate={this.validate.bind(this)} addField={this.addField.bind(this)} removeField={this.removeField.bind(this)} />
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
      _set(this.model, name, value);
      this.forceUpdate();
    }

    addField(name, field) {
      if (field && !field.id) {
        field._id = uuid.v4();
      }
      const addTo = _get(this.model, name);
      addTo.push(field);
      this.forceUpdate();
    }

    removeField(name, index) {
      const addTo = _get(this.model, name);
      addTo.splice(index, 1);
      this.forceUpdate();
    }

    validate(event, onValid) {
      event.stopPropagation();
      // need to validate
      const isValid = this.validateForm();

      if (isValid) {
        onValid(this.model);
      } else {
        console.log('Form is not valid');
      }

      // if valid call outside method

      // else if not valid display errors
    }

    validateForm() {
      let isAllValid = true;
      // loop through all of our inputs, we need to validate each one
      Object.keys(this.inputs).forEach((name) => {
        // grab the component
        const component = this.inputs[name];

        // grab the value
        const value = _get(this.model, name);

        // validate the value
        const isValid = this.validateField(component, value);
        // if isAllValid = true and isValid = false, then set to false
        if (isAllValid && !isValid) {
          isAllValid = false;
        }
      });

      return isAllValid;
    }

    validateField(component, value) {
      let isValid = true;
      if (component.required) {
        if (typeof value === 'undefined' || value === '') {
          isValid = false;
          // TODO: PROBABLY shouldn't be doing this, maybe call method on component instead?
          component.setState({
            isValid: false,
            errorMessage: 'This field is required' // TODO: pull this from someplace else
          });
        }
      }

      return isValid;
    }
  }

  Form.childContextTypes = {
    attachToForm: PropTypes.func.isRequired,
    detachFromForm: PropTypes.func.isRequired,
    onFormFieldChange: PropTypes.func.isRequired
  };

  return Form;
};
