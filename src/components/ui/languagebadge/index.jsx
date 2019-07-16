import PropTypes from 'prop-types';
import React from 'react';
import styles from './languagebadge.scss';

const LanguageBadge = props => {
  const { name } = props;

  return <div className={styles.badge}>{name}</div>;
};

LanguageBadge.propTypes = {
  name: PropTypes.string.isRequired
};

export default LanguageBadge;
