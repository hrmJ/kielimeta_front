import React from 'react';
import PropTypes from 'prop-types';
import styles from './author.scss';
import generalStyles from '../../../../general_styles/general_styles.scss';

const Author = props => {
  const {
    details: { name, role }
  } = props;
  return (
    <li className={generalStyles.labelContainer}>
      <div className={styles.name}>{name}</div>
      <div className={styles.role}>{role && `(${role})`}</div>
    </li>
  );
};

Author.propTypes = {
  details: PropTypes.shape({ name: PropTypes.string, id: PropTypes.string, role: PropTypes.string })
};

Author.defaultProps = {
  details: { name: '', id: '', role: '' }
};

export default Author;
