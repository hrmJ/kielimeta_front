import React from 'react';

import Icon from '../icon';
import styles from './closablebox.scss';

const ClosableBox = (props) => {
  const {
    children, className = styles.boxContainer, onClose, id,
  } = props;

  return (
    <div className={`${styles.closableBox} ${className}`} id={id}>
      <Icon className={styles.closer} iconName="faWindowClose" onClick={() => onClose()} />
      {children}
    </div>
  );
};

export default ClosableBox;
