import React from 'react';
import PropTypes from 'prop-types';
import styles from '../add/add.scss';

const Save = props => {
  const { text, id, disabled } = props;
  return (
    <button className={styles.container} tabIndex={0} type="submit" id={id} disabled={disabled}>
      <div>{text}</div>
    </button>
  );
};

Save.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool
};

Save.defaultProps = {
  text: 'Tallenna',
  id: '',
  disabled: false
};

export default Save;
