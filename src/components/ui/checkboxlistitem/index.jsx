import React from 'react';
import styles from './checkboxlistitem.scss';

export default props => {
  const { children, onChange, value, id } = props;

  return (
    <li>
      <div className={styles.cbListItem}>
        <div>
          <input value={value} type="checkbox" onChange={onChange} id={id} />
        </div>
        <div>{children}</div>
      </div>
    </li>
  );
};
