import React, { Component } from 'react';
import cuid from 'cuid';
import FoldableBox from '../foldablebox';
import styles from './orderselect.scss';

export default props => {
  const { items = [] } = props;

  return (
    <FoldableBox header="Järjestä">
      <ul className={styles.options}>
        {items.map((item, idx) => (
          <li key={cuid()}>{item}</li>
        ))}
      </ul>
    </FoldableBox>
  );
};
