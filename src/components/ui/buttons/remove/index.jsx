import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import BasicButton from '../BasicButton';
import styles from './remove.scss';

const RemoveButton = props => (
  <BasicButton {...props} customClass={styles.container} icon={faTrash} />
);

export default RemoveButton;
