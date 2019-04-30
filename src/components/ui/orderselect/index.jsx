import React, { Component } from 'react';
import cuid from 'cuid';
import FoldableBox from '../foldablebox';

export default props => {
  const { items = [] } = props;

  return (
    <FoldableBox header="Järjestä">
      <ul>
        {items.map((item, idx) => (
          <li key={cuid()}>{item}</li>
        ))}
      </ul>
    </FoldableBox>
  );
};
