import React, { PropTypes } from 'react';

const Field = (props) => (
  <li>{props.data.type} - {props.data.label}
    <ul>{props.data.options.map(result => <li key={result._id}>{result.label} - {result.type}</li>)}</ul>
  </li>
);

Field.propTypes = {
  data: PropTypes.object.isRequired
};

export default Field;
