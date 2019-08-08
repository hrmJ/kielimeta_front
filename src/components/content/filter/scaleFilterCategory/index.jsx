import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter } from '../../../../redux/actions/filters';
import styles from './scalefiltercategory.scss';
import rangeStyles from '../../../../vendorstyles/unmodifiedSass_inputRange/input-range.scss';

const WAIT_INTERVAL = 900;

class scaleFilterCategory extends Component {
  constructor(props) {
    super();
    this.state = { value: undefined };
  }

  componentWillMount() {
    this.timer = null;
  }

  componentWillReceiveProps() {
    const { min, max, reset } = this.props;
    if (reset) {
      this.setState({ value: { min, max } });
    }
  }

  handleChange(newValue) {
    clearTimeout(this.timer);
    this.setState({ value: newValue });
    this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
  }

  triggerChange() {
    const { value } = this.state;
    this.updateValue(value);
  }

  updateValue(val) {
    const { dispatch, filters, filterKey } = this.props;
    dispatch(updateAndFilter(filterKey, [val.min, val.max], true, filters));
  }

  render() {
    const { min, max, label, reset } = this.props;
    const { value } = this.state;

    return (
      <div className={styles.container}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.rangeContainer}>
          <InputRange
            maxValue={max}
            minValue={min}
            onChange={val => this.handleChange(val)}
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
