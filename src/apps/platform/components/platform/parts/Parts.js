import React, { Component, PropTypes } from 'react';
import Part from './Part.js';

class Parts extends Component {
  static propTypes = {
    parts: PropTypes.object.isRequired,
    partIds: PropTypes.array.isRequired
  };

  static defaultProps = {
    parts: {},
    partIds: []
  };

  render() {
    const partsToRender = this.props.partIds.map(id => this.props.parts[id]);

    return (
      <div className="row">
        <div className="col-md-12">
          <h4>Parts</h4>
          {partsToRender.length === 0 ? <p>No parts have been added.</p> : null}
          {partsToRender.length > 0 ?  <ul> {partsToRender.map((result) => { return <Part key={result.id} data={result}/>; })} </ul> : null}
        </div>
      </div>
    );
  }
}

export default Parts;
