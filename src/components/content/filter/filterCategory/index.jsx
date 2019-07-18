import React from 'react';
import PropTypes from 'prop-types';

const filterCategory = props => {
  const { isChecked, value, label, onCheck, className } = props;

  return (
    <li className={className}>
      <div>
        <input type="checkbox" value={value} checked={isChecked} onChange={onCheck} />
      </div>
      <div>{label}</div>
    </li>
  );
};

filterCategory.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onCheck: PropTypes.bool.isRequired,
  className: PropTypes.string
};

filterCategory.defaultProps = {
  className: ''
};

export default filterCategory;
