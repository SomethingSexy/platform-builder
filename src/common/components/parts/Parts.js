import React, { Component, PropTypes } from 'react';
import Part from './Part.js';
import PartGroup from './PartGroup.js';
import { Link } from 'react-router';
import PartGroupForm from './PartGroupForm.js';

class Parts extends Component {
  static propTypes = {
    parts: PropTypes.array.isRequired,
    partGroups: PropTypes.array.isRequired,
    onRemovePart: PropTypes.func.isRequired,
    onEditPart: PropTypes.func.isRequired,
    platformId: PropTypes.string.isRequired,
    onAddPartGroup: PropTypes.func.isRequired,
    onSelectPartForGroup: PropTypes.func.isRequired
  };

  static defaultProps = {
    parts: []
  };

  constructor(props) {
    super(props);
    this.createPartLink = `/platform/${this.props.platformId}/part`;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleToggleSelectPart = this.handleToggleSelectPart.bind(this);
    this.handleSelectPart = this.handleSelectPart.bind(this);
    this.state = {
      showModal: false,
      showSelectPart: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleToggleSelectPart(partGroupId) {
    // toggle showing of select part
    this.setState({ showSelectPart: !this.state.showSelectPart, selectedPartGroup: partGroupId });
  }

  handleSelectPart(partId) {
    this.onSelectPartForGroup(this.state.selectedPartGroup, partId);
  }

  render() {
    return (
      <div className="row parts-container">
        <div className="col-md-12">
          <h4>Parts</h4>
          <div className="clearfix"><div className="btn-group pull-lg-right"><Link className="btn btn-secondary" to={this.createPartLink}>Create New Part</Link><button className="btn btn-secondary" onClick={this.open}>Create Part Group</button></div></div>
          {this.state.showModal ? <PartGroupForm onCancel={this.close} onSave={this.props.onAddPartGroup} /> : null}
          {this.props.parts.length === 0 && this.props.partGroups.length === 0 ? <p>No parts have been added.</p> : null}
          {this.props.partGroups.length > 0 ? <ul className="part-groups list-group"> {this.props.partGroups.map((result) => <PartGroup key={result._id} partGroup={result} onToggleSelectPart={this.handleToggleSelectPart} onRemove={this.props.onRemovePart} onEdit={this.props.onEditPart} />)} </ul> : null}
          {this.props.parts.length > 0 ? <ul className="parts list-group"> {this.props.parts.map((result) => <Part key={result._id} data={result} selectable={this.state.showSelectPart} onRemove={this.props.onRemovePart} onEdit={this.props.onEditPart} onSelectPart={this.props.handleSelectPart} />)} </ul> : null}
        </div>
      </div>
    );
  }
}

export default Parts;
