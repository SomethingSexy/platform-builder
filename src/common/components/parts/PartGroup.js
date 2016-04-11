import React, { Component, PropTypes } from 'react';
import _find from 'lodash.find';
import Part from './Part.js';

class PartGroup extends Component {
  static propTypes = {
    partGroup: PropTypes.object.isRequired,
    parts: PropTypes.array.isRequired,
    // onRemove: PropTypes.func.isRequired,
    // onEdit: PropTypes.func.isRequired,
    onToggleSelectPart: PropTypes.func.isRequired,
    onRemovePart: PropTypes.func.isRequired,
    onEditPart: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggleSelectPart = this.handleToggleSelectPart.bind(this);
  }

  handleRemove(event) {
    event.stopPropagation();
    this.props.onRemove(this.props.partGroup._id);
  }

  handleEdit(event) {
    event.stopPropagation();
    this.props.onEdit(this.props.partGroup._id);
  }

  handleToggleSelectPart() {
    this.props.onToggleSelectPart(this.props.partGroup._id);
  }

  render() {
    let parts = this.props.partGroup.parts.map((result) => {
      const part = _find(this.props.parts, { _id: result });
      return (<Part
        key={result._id}
        data={part}
        // selectable={this.state.showSelectPart}
        onRemove={this.props.onRemovePart}
        onEdit={this.props.onEditPart}
        // onSelectPart={this.handleSelectPart}
      />);
    });

    return (
      <li className="list-group-item clearfix partGroup">
        <h5 className="list-group-item-heading"><i className="fa fa-cubes" title="This is a part group."></i> {this.props.partGroup.name}</h5>
        <p className="list-group-item-text">{this.props.partGroup.description}</p>
        <span className="parts-header"><strong>Parts</strong></span>
        <div className="btn-group pull-xs-right" role="group" aria-label="">
          <button className="btn btn-secondary" onClick={this.handleToggleSelectPart}>Add Part</button>
        </div>
        <ul className="parts list-group">{parts}</ul>
      </li>
    );
  }
}

export default PartGroup;
