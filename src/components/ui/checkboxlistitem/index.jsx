import React from 'react';
import styles from './checkboxlistitem.scss';

export default props => {
  const { children, onChange, value } = props;

  return (
    <li>
      <div className={styles.cbListItem}>
        <div>
          <input value={value} type="checkbox" onChange={onChange} />
        </div>
        <div>{children}</div>
      </div>
    </li>
  );
};
