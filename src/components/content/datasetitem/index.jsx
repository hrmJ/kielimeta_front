import React from 'react';
import PropTypes from 'prop-types';
import styles from './datasetitem.scss';

const datasetItem = (props) => {
  const { title } = props;
  return <div className={styles.datasetItem}>{title}</div>;
};

datasetItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default datasetItem;
