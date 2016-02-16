import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../common/components/form/fields/TextInput.js';
import Textarea from '../../../../common/components/form/fields/Textarea.js';
import Static from '../../../../common/components/form/fields/Static.js';
import Checkboxes from '../../../../common/components/form/fields/Checkboxes.js';
import Button from '../../../../common/components/Button.js';
import AddCustomField from './fields/AddCustomField';
import form from '../../../../common/components/form/Form.js';
import Parts from './parts/Parts.js';
import { Link } from 'react-router';

const model = {
  fields: [],
  parts: [],
  partGroups: []
};

class PlatformForm extends Component {
  static get propTypes() {
    return {
      form: PropTypes.object.isRequired,
      addField: PropTypes.func.isRequired,
      removeField: PropTypes.func.isRequired,
      validate: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired,
      parts: PropTypes.object.isRequired,
      onRemovePart: PropTypes.func.isRequired
    };
  }
  // For the model, we really only need to set the deep properties and arrays.  If I create
  // a multi-component (what AddcustomField would be) or some sort of deepComponent, than that
  // could set the model as it gets created
  // TODO: I will probably need to end up generating unique ids for the fields, parts, otherwise figure out the best way to update/remove server-side
  constructor(props) {
    super(props);
  }

  render() {
    const checkboxes = [{
      label: 'Allow company',
      value: true,
      selectedValue: this.props.form.showCompany,
      name: 'showCompany'
    }, {
      label: 'Allow brands',
      value: true,
      selectedValue: this.props.form.showBrands,
      name: 'showBrands'
    }, {
      label: 'Allow people',
      value: true,
      selectedValue: this.props.form.showPeople,
      name: 'showPeople'
    }, {
      label: 'Allow tags',
      value: true,
      selectedValue: this.props.form.showTags,
      name: 'showTags'
    }, {
      label: 'Allow photos',
      value: true,
      selectedValue: this.props.form.showPhotos,
      name: 'showPhotos'
    }, {
      label: 'Allow transactions',
      value: true,
      selectedValue: this.props.form.showTransactions,
      name: 'showTransactions'
    }, {
      label: 'Allow additional parts',
      value: true,
      selectedValue: this.props.form.allowAdditionalParts,
      name: 'allowAdditionalParts'
    }];
    const createPartLink = '/platform/' + this.props.form._id + '/part';
    return (
      <div>
        {this.props.form.category ? <Static label="Category" value={this.props.form.category.name}/> : null}
        <TextInput name="name" label="Name" />
        <Textarea name="description" label="Description" />
        <Checkboxes label="Configuration" checkboxes={checkboxes}/>
        <h3>Custom Fields</h3>
        <Button text="Add Field" onButtonClick={this.handleAddField.bind(this)}/>
        {this.props.form.fields.map((result, index) => {
          return <AddCustomField key={result._id} index={index} field="fields" onRemove={this.handleRemoveField.bind(this, index)} addField={this.props.addField} removeField={this.props.removeField} {...result} />;
        })}
        <h3>Diagram</h3>
        <Link to={createPartLink}>Create New Part</Link>
        <Parts partIds={this.props.form.parts} parts={this.props.parts} onRemovePart={this.props.onRemovePart}/>
        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
      </div>
    );
  }

  handleAddField() {
    this.props.addField('fields', {options: []});
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
}

export default form(PlatformForm, {
  model
});
