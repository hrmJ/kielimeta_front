import React from 'react';
import PropTypes from 'prop-types';
import { faPencilAlt as editIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './edit.scss';

const Edit = props => {
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
        <FontAwesomeIcon role="button" icon={editIcon} />
      </div>
    </div>
  );
};

Edit.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  text: PropTypes.string
};
Edit.defaultProps = {
  onClick: () => null,
  id: '',
  text: 'Muokkaa'
};

export default Edit;
