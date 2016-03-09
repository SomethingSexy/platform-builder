import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm, addArrayValue } from 'redux-form';
import { fetchPlatform, removePartAndSavePlatform, savePlatform, activatePlatform, addPartGroup } from '../../../common/actions/platform.js';
import { getCategories } from '../../../common/actions/categories.js';
import Button from '../../../common/components/Button.js';
import FieldForm from '../components/FieldForm.js';
import Parts from '../../../common/components/parts/Parts.js';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

const fields =  [
  'name', 
  'description', 
  'showCompany', 
  'showBrands', 
  'showPeople', 
  'showTags', 
  'showPhotos', 
  'showTransactions', 
  'allowAdditionalParts', 
  'fields[].type',
  'fields[].label',
  'fields[].options[].label',
  'fields[].options[].value']

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
    const {
      fields: {name, description, fields},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <fieldset className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className ="form-control" {...name}/>
          {name.touched && name.error && <span id="helpBlock2" className="help-block">{name.error}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Description</label>
          <textarea className ="form-control" {...description}/>
          {description.touched && description.error && <span id="helpBlock2" className="help-block">{description.error}</span>}
        </fieldset>
        <fieldset className="form-group">
          <legend>Configuration</legend>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showCompany}></input>
                Allow company
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showBrands}></input>
                Allow brands
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showPeople}></input>
                Allow people
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showTags}></input>
                Allow tags
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showPhotos}></input>
                Allow photos
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.showTransactions}></input>
                Allow transactions
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" {...this.props.fields.allowAdditionalParts}></input>
                Allow additional parts
              </label>
            </div>
        </fieldset>
        <h4>Custom Fields</h4>
          <button type="button" onClick={() => {
            fields.addField();
          }}><i/> Add Field
          </button>
        {fields.map((field, index) => <FieldForm key={index} {...field}/>)}
        <button className="btn btn-primary" type="submit"onClick={handleSubmit(data => {
            // do something with data. validation will have been called at this point,
            // so you know the data is valid
            console.log(data);
          })}>Save</button>
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

UpdatePlatform = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'platform',                           // a unique name for this form
  fields,
  validate
}, (state, ownProps) => {
  return {
    initialValues: state.platforms.platformsById[ownProps.params.platformId]
  };
},{
  addValue: addArrayValue
})(UpdatePlatform);

// not sure what this would all need yet
export default connect(select)(UpdatePlatform);


        // <Button onClick={this.handleAddField}>Add Field</Button>
        // {workingPlatform.fields.map((result, index) => <FieldForm index={index} key={index} onFieldAddOption={this.handleAddFieldOption} field={result} fieldKey="platforms.workingPlatform" />)}
        // <Parts platformId={workingPlatform._id} parts={workingPlatform.parts} onRemovePart={this.handleRemovePart} onEditPart={this.handleEditPart} onAddPartGroup={this.handleAddPartGroup} />