import React, { Component, PropTypes } from 'react';
import Part from './Part.js';

class Parts extends Component {
  static get propTypes() {
    return {
      parts: PropTypes.array.isRequired
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h4>Parts</h4>
          {this.props.parts.length === 0 ? <p>No parts have been added.</p> : null}
          {this.props.parts.length > 0 ?  <ul> {this.props.parts.map((result) => { return <Part key={result.id} data={result}/>; })} </ul> : null}
        </div>
      </div>
    );
  }
}

export default Parts;
