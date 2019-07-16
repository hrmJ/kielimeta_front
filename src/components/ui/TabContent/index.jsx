import React from 'react';
import PropTypes from 'prop-types';
import styles from './tabcontent.scss';

const TabContent = props => {
  const { children } = props;
  return <div className={styles.container}>{children}</div>;
};

TabContent.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabContent;
