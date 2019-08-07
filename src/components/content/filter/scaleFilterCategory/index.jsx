import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import React from 'react';

import { updateAndFilter } from '../../../../redux/actions/filters';
import styles from './scalefiltercategory.scss';
import rangeStyles from '../../../../vendorstyles/unmodifiedSass_inputRange/input-range.scss';

const scaleFilterCategory = props => {
  const { min, max, label, filterKey, dispatch, filters } = props;
  let value;
  if (filterKey in filters) {
    value = { min: filters[filterKey][0], max: filters[filterKey][1] };
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div>
        <InputRange
          maxValue={max}
          minValue={min}
          onChange={val => dispatch(updateAndFilter(filterKey, [val.min, val.max], true, filters))}
          value={value || { min, max }}
        />
      </div>
    </div>
  );
};

scaleFilterCategory.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired
};

export default scaleFilterCategory;
