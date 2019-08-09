import React from 'react';

import Icon from '../icon';
import styles from './closablebox.scss';

const ClosableBox = props => {
  const { children, className = styles.boxContainer, onClose, id, additionalClass } = props;

  return (
    <div className={`${styles.closableBox} ${className} ${additionalClass}`} id={id}>
      <Icon className={styles.closer} iconName="faWindowClose" onClick={() => onClose()} />
      {children}
    </div>
  );
};

export default ClosableBox;
