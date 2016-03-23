import React, { Component, PropTypes } from 'react';
import Button from '../Button.js';
import Field from './Field.js';

class PartGroup extends Component {
  static propTypes = {
    partGroup: PropTypes.object.isRequired,
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
    this.props.onRemove(this.props.partGroup._id);
  }

  handleEdit(event) {
    event.stopPropagation();
    this.props.onEdit(this.props.partGroup._id);
  }

  render() {
    return (
      <li className="list-group-item clearfix partGroup">
        <h5 className="list-group-item-heading"><i className="fa fa-cubes" title="This is a part group."></i> {this.props.partGroup.name}</h5>
        <p className="list-group-item-text">{this.props.partGroup.description}</p>
        <span className="parts-header"><strong>Parts</strong></span>

        <div className="btn-group pull-lg-right" role="group" aria-label="Basic example">
          <Button buttonClass="btn-secondary" onClick={this.handleEdit}>Edit</Button>
          <Button buttonClass="btn-secondary" onClick={this.handleRemove}>Remove</Button>
        </div>
      </li>
    );
  }
}

export default PartGroup;
