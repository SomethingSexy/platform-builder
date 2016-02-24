import React, { Component, PropTypes } from 'react';
import Part from './Part.js';

class Parts extends Component {
  static propTypes = {
    parts: PropTypes.array.isRequired,
    onRemovePart: PropTypes.func.isRequired,
    onEditPart: PropTypes.func.isRequired
  };

  static defaultProps = {
    parts: []
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4>Parts</h4>
          {this.props.parts.length === 0 ? <p>No parts have been added.</p> : null}
          {this.props.parts.length > 0 ?  <ul className="parts list-group"> {this.props.parts.map((result) => { return <Part key={result._id} data={result} onRemove={this.props.onRemovePart} onEdit={this.props.onEditPart}/>; })} </ul> : null}
        </div>
      </div>
    );
  }
}

export default Parts;
