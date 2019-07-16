import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../icon';
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
        <Icon role="button" iconName="faPlus" />
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
