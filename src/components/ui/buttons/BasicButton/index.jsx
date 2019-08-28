import React from 'react';
import PropTypes from 'prop-types';
import styles from './basicbutton.scss';
import Icon from '../../icon';

const BasicButton = props => {
  const { onClick, id, text, iconName, noBackground, customClass, iconFirst, noKeyDown } = props;
  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={!noKeyDown ? onClick : () => null}
      className={`${styles.container} ${noBackground &&
        styles.noBackground} ${customClass} ${iconFirst && styles.reversed}`}
    >
      <div>{text}</div>
      {iconName && (
        <div className={styles.iconContainer}>
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
  iconName: PropTypes.string,
  iconFirst: PropTypes.bool,
  noKeyDown: PropTypes.bool
};
BasicButton.defaultProps = {
  onClick: () => null,
  id: '',
  text: 'Muokkaa',
  noBackground: false,
  customClass: '',
  iconName: '',
  iconFirst: false,
  noKeyDown: false
};

export default BasicButton;
