import React from 'react';
import PropTypes from 'prop-types';
import styles from './l2details.scss';

const L2details = props => {
  const { l1 } = props;
  return (
    <div className={styles.container}>
      <span>Puhujien äidinkielet: </span>
      <span>{l1.reduce((prev, lang) => `${prev && `${prev}, `}${lang.language_name}`, '')}</span>
    </div>
  );
};

L2details.propTypes = {
  l1: PropTypes.arrayOf(
    PropTypes.shape({ language_name: PropTypes.string, language_code: PropTypes.string })
  ).isRequired
};

export default L2details;
