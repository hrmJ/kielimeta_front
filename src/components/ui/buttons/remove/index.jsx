import React from 'react';

import BasicButton from '../BasicButton';
import styles from './remove.scss';

const RemoveButton = props => (
  <BasicButton {...props} customClass={styles.container} iconName="faTrash" />
);

export default RemoveButton;
