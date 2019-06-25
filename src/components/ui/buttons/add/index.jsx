import React from 'react';
import PropTypes from 'prop-types';
import { faPlus as plusIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './add.scss';

const Add = props => {
  const { onClick, id, text } = props;
  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className={styles.container}
    >
      <div>{text}</div>
      <div>
        <FontAwesomeIcon role="button" icon={plusIcon} />
      </div>
    </div>
  );
};

Add.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  text: PropTypes.string
};
Add.defaultProps = {
  onClick: () => null,
  id: '',
  text: 'Lisää'
};

export default Add;
