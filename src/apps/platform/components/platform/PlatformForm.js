import React, { Component, PropTypes } from 'react';
import TextInput from '../../../../common/components/form/fields/TextInput.js';
import Textarea from '../../../../common/components/form/fields/Textarea.js';
import Static from '../../../../common/components/form/fields/Static.js';
import Checkboxes from '../../../../common/components/form/fields/Checkboxes.js';
import Button from '../../../../common/components/Button.js';
import AddCustomField from './fields/AddCustomField';
import form from '../../../../common/components/form/Form.js';
import merge from 'merge';
import update from 'react-addons-update';

const model = {configuration: {fields: []}};

class PlatformForm extends Component {
  static get propTypes() {
    return {
      form: PropTypes.object.isRequired,
      addField: PropTypes.func.isRequired,
      validate: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired
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
      value: 'true',
      selectedValue: this.props.form.showCompany,
      name: 'showCompany'
    }, {
      label: 'Allow brands',
      value: 'true',
      selectedValue: this.props.form.showBrands,
      name: 'showBrands'
    }, {
      label: 'Allow people',
      value: 'true',
      selectedValue: this.props.form.showPeople,
      name: 'showPeople'
    }, {
      label: 'Allow tags',
      value: 'true',
      selectedValue: this.props.form.showTags,
      name: 'showTags'
    }, {
      label: 'Allow photos',
      value: 'true',
      selectedValue: this.props.form.showPhotos,
      name: 'showPhotos'
    }, {
      label: 'Allow transactions',
      value: 'true',
      selectedValue: this.props.form.showTransactions,
      name: 'showTransactions'
    }];

    return (
      <div>
        <Static label="Category" value={this.props.form.category.name}/>
        <TextInput name="name" label="Name" />
        <Textarea name="description" label="Description" />
        <Checkboxes label="Configuration" checkboxes={checkboxes}/>
        <h3>Custom Fields</h3>
        <Button text="Add Field" onButtonClick={this.handleAddField.bind(this)}/>
        {this.props.form.configuration.fields.map((result, index) => {
          return <AddCustomField key={index} index={index} field="configuration.fields" onRemove={this.handleRemoveField.bind(this, index)} addField={this.props.addField} {...result} />;
        })}
        <h3>Diagram</h3>
        <Button text="Save" onButtonClick={this.handleSave.bind(this)} />
      </div>
    );
  }

  handleAddField() {
    this.props.addField('configuration.fields', {options: []});
  }

  handleRemoveField(index) {
    this.setState({
      configuration: {
        fields: update(this.state.configuration.fields, {$splice: [[index, 1]]})
      }
    });
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
