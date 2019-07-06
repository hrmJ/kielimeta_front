import React from 'react';
import PropTypes from 'prop-types';
import styles from './basicbutton.scss';
import Icon from '../../icon';

const BasicButton = props => {
  const { onClick, id, text, iconName, noBackground, customClass } = props;
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
      {iconName && (
        <div>
          <Icon iconName={iconName} />
        </div>
      )}
    </div>
  );
};

BasicButton.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  text: PropTypes.string,
  noBackground: PropTypes.bool,
  customClass: PropTypes.string,
  iconName: PropTypes.string
};
BasicButton.defaultProps = {
  onClick: () => null,
  id: '',
  text: 'Muokkaa',
  noBackground: false,
  customClass: '',
  iconName: ''
};

export default BasicButton;
