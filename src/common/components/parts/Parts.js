import React, { Component, PropTypes } from 'react';
import Part from './Part.js';
import PartGroup from './PartGroup.js';
import { Link } from 'react-router';
import PartGroupForm from './PartGroupForm.js';

// Determine if part is in group
function inPartGroup(partId, partGroups = []) {
  if (!partId) {
    return false;
  }
  return partGroups.find(partGroup => partGroup.parts.indexOf(partId) > -1);
}

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.partGroups.length > this.props.partGroups.length) {
      this.setState({ showModal: false });
    }
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
    this.props.onSelectPartForGroup(this.state.selectedPartGroup, partId);
  }

  render() {
    let partGroupForm;
    if (this.state.showModal) {
      partGroupForm = <PartGroupForm onCancel={this.close} onSave={this.props.onAddPartGroup} />;
    }

    let partGroups = this.props.partGroups.map((result) =>
      <PartGroup
        key={result._id}
        partGroup={result}
        parts={this.props.parts}
        onToggleSelectPart={this.handleToggleSelectPart}
        onRemovePart={this.props.onRemovePart}
        onEditPart={this.props.onEditPart}
      />
    );

    let parts = this.props.parts.map((result) => {
      if (!inPartGroup(result._id, this.props.partGroups)) {
        return (<Part
          key={result._id}
          data={result}
          selectable={this.state.showSelectPart}
          onRemove={this.props.onRemovePart}
          onEdit={this.props.onEditPart}
          onSelectPart={this.handleSelectPart}
        />);
      }

      return null;
    });

    return (
      <div className="row parts-container">
        <div className="col-md-12">
          <h4>Parts</h4>
          <div className="clearfix">
            <div className="btn-group pull-lg-right">
              <Link className="btn btn-secondary" to={this.createPartLink}>Create New Part</Link>
              <button className="btn btn-secondary" onClick={this.open}>Create Part Group</button>
            </div>
          </div>
          {partGroupForm}
          {this.props.parts.length === 0 && this.props.partGroups.length === 0 ? <p>No parts have been added.</p> : null}
          <ul className="part-groups list-group">{partGroups}</ul>
          <ul className="parts list-group">{parts}</ul>
        </div>
      </div>
    );
  }
}

export default Parts;
