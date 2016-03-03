import React, { Component, PropTypes } from 'react';
import form from '../form/Form.js';
import TextInput from '../form/fields/TextInput.js';
import Button from '../Button.js';

class PartGroupForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(event) {
    // PROBABLY not the best way to do this but it will work for now
    this.props.validate(event, data => {
      this.props.onSave(data);
    });
  }

  render() {
    return (
      <div>
        <h5>Create Part Group</h5>
        <p>A part group is a way to organize parts into logical groupings.  Groupings can contain parts or other groupings.  Products can also be created from groupings.</p>
        <hr />
        <TextInput name="name" label="Name" required />
        <TextInput name="description" label="Description" required />
        <div className="btn-group">
          <Button buttonClass="btn-primary" onClick={this.handleSave}>Save</Button>
          <Button buttonClass="btn-secondary" onClick={this.props.onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
}

export default form(PartGroupForm, {
  model: {},
  className: 'create-part-group'
});
