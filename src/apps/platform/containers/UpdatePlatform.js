import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, actions, getField } from 'react-redux-form';
import { fetchPlatform, removePartAndSavePlatform, savePlatform, activatePlatform, addPartGroup } from '../../../common/actions/platform.js';
import { getCategories } from '../../../common/actions/categories.js';
import Button from '../../../common/components/Button.js';
import FieldForm from '../components/FieldForm.js';
import Parts from '../../../common/components/parts/Parts.js';

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class UpdatePlatform extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    platforms: PropTypes.object.isRequired
  }

  static get needs() {
    return [getCategories, fetchPlatform];
  }

  constructor(props) {
    super(props);
    this.handleActivateBind = this.handleActivate.bind(this);
    this.handleDeactivateBind = this.handleDeactivate.bind(this);
    this.handleAddPartGroup = this.handleAddPartGroup.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleAddFieldOption = this.handleAddFieldOption.bind(this);
    this.handleEditPart = this.handleEditPart.bind(this);
    this.handleRemovePart = this.handleRemovePart.bind(this);
  }

  // this will be handled here because we might have
  // to do some special handling with it
  handleRemovePart(partId) {
    // call to delete the part, which will remove it from
    this.props.dispatch(removePartAndSavePlatform(partId));
  }

  handleEditPart(partId) {
    browserHistory.push(`/platform/${this.props.platforms.workingPlatform._id}/part/${partId}`);
  }

  handleSave(event) {
    event.stopPropagation();
    // Not sure if it is the best way to do it this way or have the action pull it from the working one?
    this.props.dispatch(savePlatform(this.props.platforms.workingPlatform));
  }

  handleActivate() {
    this.props.dispatch(activatePlatform(this.props.platforms.workingPlatform._id));
  }

  handleDeactivate() {

  }

  handleAddPartGroup(partGroup) {
    this.props.dispatch(addPartGroup(this.props.platforms.workingPlatform._id, partGroup));
  }

  handleAddField() {
    this.props.dispatch(actions.push('platforms.workingPlatform.fields', { options: [] }));
  }

  handleAddFieldOption(fieldIndex) {
    this.props.dispatch(actions.push(`platforms.workingPlatform.fields[${fieldIndex}].options`));
  }

  render() {
    const { workingPlatformForm, workingPlatform } = this.props.platforms;
    const isNameValid = getField(workingPlatformForm, 'name').valid;
    const isDescriptionValid = getField(workingPlatformForm, 'description').valid;
    return (
      <form>
        <Field model="platforms.workingPlatform.name"
          validators={{
            required: (val) => val && val.length
          }}
        >
          <fieldset className={isNameValid ? 'form-group' : 'form-group has-error'}>
            <label htmlFor="">Name</label>
            <input type="text" className ="form-control" placeholder="" />
            {!isNameValid ? <span id="helpBlock2" className="help-block">Invalid field</span> : '' }
          </fieldset>
        </Field>
        <Field model="platforms.workingPlatform.description"
          validators={{
            required: (val) => val && val.length
          }}
        >
          <fieldset className="form-group">
            <label htmlFor="">Description</label>
            <textarea type="email" className ="form-control" id="" placeholder="" />
            {!isDescriptionValid ? <span id="helpBlock2" className="help-block">Invalid field</span> : '' }
          </fieldset>
        </Field>
        <fieldset className="form-group">
          <legend>Configuration</legend>
          <Field model="platforms.workingPlatform.showCompany" updateOn="change">
            <div className="checkbox">
              <label>
                <input type="checkbox" ></input>
                Allow company
              </label>
            </div>
          </Field>
          <Field model="platforms.workingPlatform.showBrands" updateOn="change">
            <div className="checkbox">
              <label>
                <input type="checkbox" ></input>
                Allow brands
              </label>
            </div>
          </Field>
          <Field model="platforms.workingPlatform.showPeople" updateOn="change">
            <div className="checkbox">
              <label>
                <input type="checkbox" ></input>
                Allow people
              </label>
            </div>
          </Field>
          <Field model="platforms.workingPlatform.showTags" updateOn="change">
            <div className="checkbox">
              <label>
                <input type="checkbox" ></input>
                Allow tags
              </label>
            </div>
          </Field>
          <Field model="platforms.workingPlatform.showPhotos" updateOn="change">
            <div className="checkbox">
              <label>
                <input type="checkbox" ></input>
                Allow photos
              </label>
            </div>
          </Field>
          <Field model="platforms.workingPlatform.showTransactions" updateOn="change">
            <div className="checkbox">
              <label>
                <input type="checkbox" ></input>
                Allow transactions
              </label>
            </div>
          </Field>
          <Field model="platforms.workingPlatform.allowAdditionalParts" updateOn="change">
            <div className="checkbox">
              <label>
                <input type="checkbox" ></input>
                Allow additional parts
              </label>
            </div>
          </Field>
        </fieldset>
        <h4>Custom Fields</h4>
        <Button onClick={this.handleAddField}>Add Field</Button>
        {workingPlatform.fields.map((result, index) => <FieldForm index={index} key={index} onFieldAddOption={this.handleAddFieldOption} field={result} fieldKey="platforms.workingPlatform" />)}
        <Parts platformId={workingPlatform._id} parts={workingPlatform.parts} onRemovePart={this.handleRemovePart} onEditPart={this.handleEditPart} onAddPartGroup={this.handleAddPartGroup} />
        <Button buttonClass="btn-primary" onClick={this.handleSave}>Save</Button>
        <Button buttonClass="btn-secondary" onClick={this.props.onActivate}>Activate</Button>
      </form>
    );
  }
}

function select(state, ownProps) {
  return {
    categories: state.categories.categories,
    platforms: {
      workingPlatform: state.platforms.workingPlatform,
      workingPlatformForm: state.platforms.workingPlatformForm
    }
  };
}

// not sure what this would all need yet
export default connect(select)(UpdatePlatform);
