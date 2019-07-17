import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BasicButton from '../BasicButton';
import styles from './toggleButton.scss';

class ToggleButton extends Component {
  state = { activeOption: 0 };

  render() {
    const { options, customClass } = this.props;
    const { activeOption } = this.state;
    const renderedProps = {
      active: {
        customClass: styles.active,
        iconName: 'faCheckCircle'
      },
      inactive: {
        customClass: styles.inactive,
        iconName: 'faCircle'
      }
    };
    return (
      <div className={`${styles.container} ${styles.stacked} ${customClass}`}>
        {options.map((option, idx) => (
          <BasicButton
            key={option}
            text={option}
            {...renderedProps[idx === activeOption ? 'active' : 'inactive']}
          />
        ))}
      </div>
    );
  }
}

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  customClass: PropTypes.string
};

ToggleButton.defaultProps = {
  customClass: ''
};

export default ToggleButton;
