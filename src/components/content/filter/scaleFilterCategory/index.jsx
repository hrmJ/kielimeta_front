import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css';
import styles from './scalefiltercategory.scss';
import rangeStyles from '../../../../vendorstyles/unmodifiedSass_inputRange/input-range.scss';

class scaleFilterCategory extends Component {
  state = { value: undefined };

  render() {
    const { min, max, label } = this.props;
    const { value } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div>
          <InputRange
            maxValue={max}
            minValue={min}
            onChange={newVal => this.setState({ value: newVal })}
            value={value || { min, max }}
          />
        </div>
      </div>
    );
  }
}

scaleFilterCategory.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};

export default scaleFilterCategory;
