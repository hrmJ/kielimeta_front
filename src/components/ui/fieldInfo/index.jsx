import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@atlaskit/tooltip';

const fieldInfo = props => {
  const { text } = props;

  return (
    <Tooltip content={text}>
      <FontAwesomeIcon role="button" icon={faInfoCircle} />
    </Tooltip>
  );
};

fieldInfo.propTypes = {
  text: PropTypes.string
};

fieldInfo.defaultProps = {
  text: ''
};

export default fieldInfo;
