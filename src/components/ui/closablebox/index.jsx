import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './closablebox.scss';

const ClosableBox = (props) => {
  const {
    children, className = styles.boxContainer, onClose, id,
  } = props;

  return (
    <div className={`${styles.closableBox} ${className}`} id={id}>
      <FontAwesomeIcon className={styles.closer} icon={faWindowClose} onClick={() => onClose()} />
      {children}
    </div>
  );
};

export default ClosableBox;
