import React from 'react';
import PropTypes from 'prop-types';

const annotationInfo = props => {
  const { level, description } = props;
  let nodes;

  if (['other', 'muu'].includes(level)) {
    nodes = <span>{description ? description : level}</span>;
  } else {
    nodes = (
      <span>
        {level}
        {description && ` (${description})`}
      </span>
    );
  }

  return <li>{nodes}</li>;
};

annotationInfo.propTypes = {
  level: PropTypes.string.isRequired,
  description: PropTypes.string
};

annotationInfo.defaultProps = {
  description: ''
};

export default annotationInfo;
