import React, { Component, PropTypes } from 'react';
import Part from './Part.js';
import Button from '../Button.js';
import { Link } from 'react-router';
import Modal from 'react-bootstrap/lib/Modal';

class Parts extends Component {
  static propTypes = {
    parts: PropTypes.array.isRequired,
    onRemovePart: PropTypes.func.isRequired,
    onEditPart: PropTypes.func.isRequired,
    platformId: PropTypes.string.isRequired
  };

  static defaultProps = {
    parts: []
  };

  constructor(props) {
    super(props);
    this.createPartLink = `/platform/${this.props.platformId}/part`;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4>Parts</h4>
          <div className="clearfix"><div className="btn-group pull-ls-right"><Link className="btn btn-secondary" to={this.createPartLink}>Create New Part</Link><Button onButtonClick={this.open}>Create Part Group</Button></div></div>
          {this.props.parts.length === 0 ? <p>No parts have been added.</p> : null}
          {this.props.parts.length > 0 ? <ul className="parts list-group"> {this.props.parts.map((result) => <Part key={result._id} data={result} onRemove={this.props.onRemovePart} onEdit={this.props.onEditPart} />)} </ul> : null}
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Create Part Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>A part group is a way to organize parts into logical groupings.  Groupings can contain parts or other groupings.  Products can also be created from groupings.</p>
              <hr />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Parts;
