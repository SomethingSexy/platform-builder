import React, { Component, PropTypes } from 'react';
import Part from './Part.js';
// import 'parts.css!';

class Parts extends Component {
  static propTypes = {
    parts: PropTypes.array.isRequired,
    // partIds: PropTypes.array.isRequired,
    onRemovePart: PropTypes.func.isRequired
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
          {this.props.parts.length > 0 ?  <ul className="parts"> {this.props.parts.map((result) => { return <Part key={result._id} data={result} onRemove={this.props.onRemovePart}/>; })} </ul> : null}
        </div>
      </div>
    );
  }
}

export default Parts;
