import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './basicbutton.scss';

const BasicButton = props => {
  const { onClick, id, text, icon, noBackground, customClass } = props;
  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className={`${styles.container} ${noBackground && styles.noBackground} ${customClass}`}
    >
      <div>{text}</div>
      {icon && (
        <div>
          <FontAwesomeIcon role="button" icon={icon} />
        </div>
      )}
    </div>
  );
};

BasicButton.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.objectOf(PropTypes.any),
  noBackground: PropTypes.bool,
  customClass: PropTypes.string
};
BasicButton.defaultProps = {
  onClick: () => null,
  id: '',
  text: 'Muokkaa',
  icon: null,
  noBackground: false,
  customClass: ''
};

export default BasicButton;
