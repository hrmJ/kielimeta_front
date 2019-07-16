import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '../tooltip';

import Icon from '../icon';
import styles from './fieldinfo.scss';

const fieldInfo = props => {
  const { text } = props;

  return (
    <Tooltip content={text} eventOn="onClick">
      <div className={styles.circle}>
        <Icon iconName="faInfoCircle" />
      </div>
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
