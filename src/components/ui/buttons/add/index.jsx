import React from 'react';
import PropTypes from 'prop-types';
import { faPlus as plusIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './add.scss';

const index = props => {
  const { onClick, id } = props;
  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className={styles.container}
    >
      <div>Lisää</div>
      <div>
        <FontAwesomeIcon role="button" icon={plusIcon} />
      </div>
    </div>
  );
};

index.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string
};
index.defaultProps = {
  onClick: () => null,
  id: ''
};

export default index;
