import React from 'react';
import PropTypes from 'prop-types';
import { faCaretUp as upArrow, faCaretDown as downArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './move.scss';

const index = props => {
  const { direction, text, onClick } = props;
  return (
    <div
      className={`${styles.container} ${direction === '>' ? styles.forward : styles.backward}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
    >
      {direction === '>' && <div>{text}</div>}
      {direction === '<' && <div>{text}</div>}
      <div>
        {direction === '<' ? (
          <FontAwesomeIcon role="button" icon={upArrow} />
        ) : (
          <FontAwesomeIcon role="button" icon={downArrow} />
        )}
      </div>
    </div>
  );
};

index.propTypes = {
  direction: PropTypes.string.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func
};

index.defaultProps = {
  text: '',
  onClick: () => null
};

export default index;
