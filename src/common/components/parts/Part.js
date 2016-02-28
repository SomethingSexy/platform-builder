import React, { Component, PropTypes } from 'react';
import Button from '../Button.js';
import Field from './Field.js';

class Part extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleRemove(event) {
    event.stopPropagation();
    this.props.onRemove(this.props.data._id);
  }

  handleEdit(event) {
    event.stopPropagation();
    this.props.onEdit(this.props.data._id);
  }

  render() {
    return (
      <li className="list-group-item clearfix part">
        <h5 className="list-group-item-heading">{this.props.data.name}</h5>
        <p className="list-group-item-text">{this.props.data.description}</p>
        <span className="fields-header"><strong>Fields</strong></span>
        <ul className="fields">
          {this.props.data.fields.map((result) => <Field key={result._id} data={result} />)}
        </ul>
        <div className="btn-group pull-lg-right" role="group" aria-label="Basic example">
          <Button text="Edit" buttonClass="btn-secondary" onButtonClick={this.handleEdit} />
          <Button text="Remove" buttonClass="btn-secondary" onButtonClick={this.handleRemove} />
        </div>
      </li>
    );
  }
}

export default Part;
