import React from 'react';
import styles from './checkboxlistitem.scss';

export default props => {
  const { children, onChange, value, id, checked = false } = props;

  return (
    <li>
      <div className={styles.cbListItem}>
        <div>
          <input value={value} type="checkbox" onChange={onChange} id={id} checked={checked} />
        </div>
        <div>{children}</div>
      </div>
    </li>
  );
};
