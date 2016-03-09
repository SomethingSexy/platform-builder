import React, { Component, PropTypes } from 'react';
import { Form, Field, actions, getField } from 'react-redux-form';
import * as PlatformActions from '../../../common/actions/platform.js';
import Button from '../../../common/components/Button.js';
import FieldForm from '../components/FieldForm.js';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class PartForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    part: PropTypes.object.isRequired,
    partForm: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onFieldAdd: PropTypes.func.isRequired
  }

  static get needs() {
    return [PlatformActions.fetchPlatform];
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    this.props.dispatch(actions.setValidity('platforms.workingPart', true));
    console.log(this.props.part);
    console.log(this.props.partForm);
    // this.props.onSave(this.props.part);      
  }

  render() {
    const isNameValid = getField(this.props.partForm, 'name').valid;
    const isDescriptionValid = getField(this.props.partForm, 'description').valid;

    return (
      <Form>
        <Field model="platforms.workingPart.name"
          validators={{
            required: (val) => val && val.length
          }}>
          <fieldset className={isNameValid ? 'form-group' : 'form-group has-error'}>
            <label htmlFor="">Name</label>
            <input type="text" className ="form-control" placeholder="" />
            {!isNameValid ? <span id="helpBlock2" className="help-block">Invalid field</span> : '' }
          </fieldset>
        </Field>
        <Field model="platforms.workingPart.description"
          validators={{
            required: (val) => val && val.length
          }}>
          <fieldset className="form-group">
            <label htmlFor="">Description</label>
            <textarea type="email" className ="form-control" id="" placeholder="" />
            {!isDescriptionValid ? <span id="helpBlock2" className="help-block">Invalid field</span> : '' }
          </fieldset>
        </Field>
        <h4>Custom Fields</h4>
        <Button onClick={this.props.onFieldAdd}>Add Field</Button>
        {this.props.part.fields.map((result, index) => <FieldForm index={index} key={index} onFieldAddOption={this.handleAddFieldOption} field={result} fieldKey="platforms.workingPart" partForm={this.props.partForm} />)}
        <button type="input" className="btn btn-primary" onClick={ this.handleSave }>Save</button>
      </Form>
    );
  }
}

function select(state, ownProps) {
  return {
    partForm: state.platforms.workingPartForm
  };
}

// not sure what this would all need yet
export default connect(select)(PartForm);
