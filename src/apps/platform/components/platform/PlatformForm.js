import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../common/components/form/fields/TextInput.js';
import Textarea from '../../../../common/components/form/fields/Textarea.js';
import Static from '../../../../common/components/form/fields/Static.js';
import Checkboxes from '../../../../common/components/form/fields/Checkboxes.js';
import Button from '../../../../common/components/Button.js';
import AddCustomField from './AddCustomField.js';
import form from '../../../../common/components/form/Form.js';
import Parts from '../../../../common/components/parts/Parts.js';

const model = {
  fields: [],
  parts: [],
  partGroups: []
};

class PlatformForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    addField: PropTypes.func.isRequired,
    removeField: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    parts: PropTypes.array.isRequired,
    onRemovePart: PropTypes.func.isRequired,
    onEditPart: PropTypes.func.isRequired,
    onActivate: PropTypes.func.isRequired,
    onDeactivate: PropTypes.func.isRequired
  }
  // For the model, we really only need to set the deep properties and arrays.  If I create
  // a multi-component (what AddcustomField would be) or some sort of deepComponent, than that
  // could set the model as it gets created
  // TODO: I will probably need to end up generating unique ids for the fields, parts, otherwise figure out the best way to update/remove server-side
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
  }

  handleAddField() {
    this.props.addField('fields', { options: [] });
  }

  handleRemoveField(index) {
    this.props.removeField('fields', index);
  }

  handleSave(event) {
    // PROBABLY not the best way to do this but it will work for now
    this.props.validate(event, data => {
      this.props.onSave(data);
    });
  }

  render() {
    const propForm = this.props.form;
    const checkboxes = [{
      label: 'Allow company',
      value: true,
      selectedValue: propForm.showCompany,
      name: 'showCompany'
    }, {
      label: 'Allow brands',
      value: true,
      selectedValue: propForm.showBrands,
      name: 'showBrands'
    }, {
      label: 'Allow people',
      value: true,
      selectedValue: propForm.showPeople,
      name: 'showPeople'
    }, {
      label: 'Allow tags',
      value: true,
      selectedValue: propForm.showTags,
      name: 'showTags'
    }, {
      label: 'Allow photos',
      value: true,
      selectedValue: propForm.showPhotos,
      name: 'showPhotos'
    }, {
      label: 'Allow transactions',
      value: true,
      selectedValue: propForm.showTransactions,
      name: 'showTransactions'
    }, {
      label: 'Allow additional parts',
      value: true,
      selectedValue: propForm.allowAdditionalParts,
      name: 'allowAdditionalParts'
    }];
    const category = propForm._category;
    const hasChildren = (category && category.children && category.children.length > 0);
    return (
      <div>
        <h3>Platform</h3>
        {hasChildren ? <div className="alert alert-info"><strong>Heads up!</strong> This platform has child platforms.</div> : null }
        {this.props.form._parentCategory ? <Static label="Category" value={this.props.form._parentCategory.name} /> : null}
        <TextInput name="name" label="Name" required />
        <Textarea name="description" label="Description" required />
        <Checkboxes label="Configuration" checkboxes={checkboxes} />
        <h4>Custom Fields</h4>
        <Button buttonClass="btn-link" onButtonClick={this.handleAddField}>Add Field</Button>
        {this.props.form.fields.map((result, index) => <AddCustomField key={result._id} index={index} field="fields" onRemove={this.handleRemoveField} addField={this.props.addField} removeField={this.props.removeField} {...result} />)}
        <h4>Diagram</h4>
        <Parts platformId={this.props.form._id} parts={this.props.form.parts} onRemovePart={this.props.onRemovePart} onEditPart={this.props.onEditPart} />
        <Button buttonClass="btn-primary" onButtonClick={this.handleSave}>Save</Button>
        <Button buttonClass="btn-secondary" onButtonClick={this.props.onActivate}>Activate</Button>
      </div>
    );
  }
}

export default form(PlatformForm, {
  model
});
