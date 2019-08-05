import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../../../ui/icon';
import styles from './modalityInfo.scss';

const printCategory = cat => {
  let text = '';
  let iconName = '';
  switch (cat) {
    case 'written':
      text = 'Kirjoitettua kieltä';
      iconName = 'faPencilAlt';
      break;
    case 'spoken':
      text = 'Puhuttua kieltä';
      iconName = 'faComments';
      break;
    case 'internet':
      text = 'Internet-kieltä';
      iconName = 'faKeyboard';
      break;
    default:
      text = '';
  }
  return (
    <div className={styles.iconContainer}>
      <Icon iconName={iconName} />
      <div>{text}</div>
    </div>
  );
};

const modalityInfo = props => {
  const { modality } = props;
  return (
    <ul className={styles.container}>
      {modality.map(mod => (
        <li key={mod}>{printCategory(mod)}</li>
      ))}
    </ul>
  );
};

modalityInfo.propTypes = {
  modality: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default modalityInfo;
