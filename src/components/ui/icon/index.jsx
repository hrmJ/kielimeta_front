import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends Component {
  state = { test: false };

  svgIcons = null;

  isMountedHack = false;

  componentDidMount() {
    this.isMountedHack = true;
    if (this.isMountedHack) {
      this.getIcons();
    }
  }

  componentWillUnmount() {
    this.isMountedHack = false;
  }

  async getIcons() {
    this.svgIcons = await import(/* webpackPrefetch: true */ `@fortawesome/free-solid-svg-icons`);
    this.setState({ test: true });
  }

  render() {
    const { role, onClick, className, iconName } = this.props;
    const pickedIcon = this.svgIcons && this.svgIcons[iconName];
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
