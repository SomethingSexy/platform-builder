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
      <ul>
        {this.props.parts.map((result) => {
          return <Part key={result.id} data={result}/>;
        })}
      </ul>
    );
  }
}

export default Parts;
