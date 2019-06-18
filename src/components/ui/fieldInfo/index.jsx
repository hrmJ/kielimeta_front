import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@atlaskit/tooltip';
import styles from './fieldinfo.scss';

const fieldInfo = props => {
  const { text } = props;
  console.log(text);

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
