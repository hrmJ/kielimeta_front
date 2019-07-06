import PropTypes from 'prop-types';
import React from 'react';

import BasicButton from '../BasicButton';
import styles from './move.scss';

const MoveButton = props => {
  const { direction, ...otherProps } = props;
  return (
    <BasicButton
      {...otherProps}
      customClass={direction === '>' ? styles.forward : styles.backward}
      iconName={direction === '>' ? 'faCaretDown' : 'faCaretUp'}
    />
  );
};

MoveButton.propTypes = {
  direction: PropTypes.string.isRequired
};

export default MoveButton;
