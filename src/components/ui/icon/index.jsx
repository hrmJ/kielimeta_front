import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends Component {
  state = { pickedIcon: null };

  componentDidMount = async () => {
    const { iconName } = this.props;
    if (iconName) {
      const svgIcons = await import('@fortawesome/free-solid-svg-icons');
      this.setState({ pickedIcon: svgIcons[iconName] });
    }
  };

  render() {
    const { role, onClick, className } = this.props;
    const { pickedIcon } = this.state;
    const otherProps = {};
    if (role) {
      otherProps.role = role;
    }
    if (onClick) {
      otherProps.onClick = onClick;
    }
    if (className) {
      otherProps.className = className;
    }
    return pickedIcon ? <FontAwesomeIcon {...otherProps} icon={pickedIcon} /> : null;
  }
}

Icon.propTypes = {
  iconName: PropTypes.string.isRequired
};

export default Icon;
