import PropTypes from 'prop-types';
import React from 'react';

import BasicButton from '../BasicButton';
import styles from './edit.scss';

const EditButton = props => (
  <BasicButton {...props} customClass={styles.container} iconName="faPencilAlt" />
);

export default EditButton;
