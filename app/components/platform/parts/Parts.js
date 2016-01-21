import React, { Component, PropTypes } from 'react';
import Part from './Part';

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
          <ul>
            {this.props.parts.map((result) => {
              return <Part key={result.id} data={result}/>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Parts;
