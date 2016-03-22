import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reduxForm, addArrayValue } from 'redux-form';
import { fetchPlatform, removePartAndSavePlatform, savePlatform, activatePlatform, addPartGroup } from '../../../common/actions/platform.js';
import { getCategories } from '../../../common/actions/categories.js';
import Button from '../../../common/components/Button.js';
import FieldForm from '../components/FieldForm.js';
import Parts from '../../../common/components/parts/Parts.js';

const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required';
    }
    return errors;
  }, {});

const validateFields = requireFields('type', 'label');
const validate = values => {
  const errors = requireFields('name', 'description')(values);
  errors.fields = values.fields.map(validateFields);

  return errors;
};

const fields = [
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
  'fields[].options[].value'];

// I think we want create an initial platform first so that whatever the user
// does is automatically saved somewhere to the server.  Don't have to worry about losing their data, etc.
class UpdatePlatform extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    platform: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool
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
    this.handleEditPart = this.handleEditPart.bind(this);
    this.handleRemovePart = this.handleRemovePart.bind(this);
  }

  handleRemovePart(partId) {
    this.props.dispatch(removePartAndSavePlatform(this.props.platform._id, partId));
  }

  handleEditPart(partId) {
    browserHistory.push(`/platform/${this.props.platform._id}/part/${partId}`);
  }

  handleSave(platform) {
    this.props.dispatch(savePlatform({ ...platform, _id: this.props.platform._id }));
  }

  handleActivate() {
    this.props.dispatch(activatePlatform(this.props.platform._id));
  }

  handleDeactivate() {

  }

  handleAddPartGroup(partGroup) {
    this.props.dispatch(addPartGroup(this.props.platform._id, partGroup));
  }

  render() {
    const {
      fields: { name, description, fields },
      handleSubmit,
      submitting
      } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSave)}>
        <fieldset className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className ="form-control" {...name} />
          {name.touched && name.error && <span id="helpBlock2" className="help-block">{name.error}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="">Description</label>
          <textarea className ="form-control" {...description} />
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
          <button className="btn btn-secondary btn-sm" type="button" onClick={() => {
            fields.addField({ options: [] });
          }}
          ><i /> Add Field
          </button>
        {fields.map((field, index) => <FieldForm key={index} {...field} />)}
        <Parts platformId={this.props.platform._id} parts={this.props.platform.parts} onRemovePart={this.handleRemovePart} onEditPart={this.handleEditPart} onAddPartGroup={this.handleAddPartGroup} />
        <div className="btn-group">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? <i /> : <i />} Save
          </button>
          <button className="btn btn-secondary" onClick={this.onActivate}>Activate</button>
        </div>
      </form>
    );
  }
}

function select(state, ownProps) {
  return {
    categories: state.categories.categories,
    platform: state.platforms.platformsById[ownProps.params.platformId]
  };
}

UpdatePlatform = reduxForm({
  form: 'platform',
  fields,
  validate
}, (state, ownProps) => {
  return {
    initialValues: state.platforms.platformsById[ownProps.params.platformId]
  };
}, {
  addValue: addArrayValue
})(UpdatePlatform);

// not sure what this would all need yet
export default connect(select)(UpdatePlatform);
