import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BasicButton from '../BasicButton';
import styles from './toggleButton.scss';

class ToggleButton extends Component {
  state = { activeOption: 0 };

  /**
   * onClick
   *
   * @param idx the index of the option that was clicked
   * @returns {undefined}
   */
  onClick(idx) {
    const { onClick } = this.props;
    this.setState({ activeOption: idx });
    onClick(idx);
  }

  render() {
    const { options, customClass, onClick } = this.props;
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
            onClick={() => this.onClick(idx)}
            {...renderedProps[idx === activeOption ? 'active' : 'inactive']}
          />
        ))}
      </div>
    );
  }
}

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  customClass: PropTypes.string,
  onClick: PropTypes.func
};

ToggleButton.defaultProps = {
  customClass: '',
  onClick: () => null
};

export default ToggleButton;
