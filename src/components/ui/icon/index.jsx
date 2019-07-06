import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import makeCancelable from 'makecancelable';

const getIcons = () =>
  import(/* webpackChunkName: "fontAwesomIcons" */ '@fortawesome/free-solid-svg-icons').then(
    svgIcons => svgIcons
  );

class Icon extends Component {
  state = { svgIcons: null };

  componentDidMount() {
    this.cancelRequest = makeCancelable(
      getIcons(),
      svgIcons => this.setState({ svgIcons }),
      console.error
    );
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  processIcon() {}

  render() {
    const { role, onClick, className, iconName } = this.props;
    const { svgIcons } = this.state;
    const pickedIcon = svgIcons && svgIcons[iconName];
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
    return svgIcons ? <FontAwesomeIcon {...otherProps} icon={pickedIcon} /> : null;
  }
}

Icon.propTypes = {
  iconName: PropTypes.string.isRequired
};

export default Icon;
