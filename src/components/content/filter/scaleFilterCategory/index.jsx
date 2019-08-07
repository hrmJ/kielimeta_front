import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter } from '../../../../redux/actions/filters';
import styles from './scalefiltercategory.scss';
import rangeStyles from '../../../../vendorstyles/unmodifiedSass_inputRange/input-range.scss';

class scaleFilterCategory extends Component {
  state = { value: undefined };

  updateValue(val) {
    const { dispatch, filters, filterKey } = this.props;
    this.setState({ value: val });
    dispatch(updateAndFilter(filterKey, [val.min, val.max], true, filters));
  }

  render() {
    const { min, max, label, reset } = this.props;
    const { value } = this.state;
    console.log(reset);

    return (
      <div className={styles.container}>
        {label && <div className={styles.label}>{label}</div>}
        <div>
          <InputRange
            maxValue={max}
            minValue={min}
            onChange={val => this.updateValue(val)}
            value={(!reset && value) || { min, max }}
          />
        </div>
      </div>
    );
  }
}

scaleFilterCategory.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string,
  filterKey: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired,
  reset: PropTypes.bool
};

scaleFilterCategory.defaultProps = {
  label: '',
  reset: false
};

export default scaleFilterCategory;
