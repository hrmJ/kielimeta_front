import React, { Component } from 'react';

class Tooltip extends Component {
  state = { AtlasTooltip: null };

  componentDidMount = async () => {
    const AtlasTooltip = await import(
      /* webpackChunkName: "atlaskit-tooltip" */ '@atlaskit/tooltip'
    );
    this.setState({ AtlasTooltip });
  };

  render() {
    const { children, ...otherProps } = this.props;
    const { AtlasTooltip } = this.state;

    if (AtlasTooltip) {
      return <AtlasTooltip {...otherProps}>{children}</AtlasTooltip>;
    }
    return null;
  }
}

export default Tooltip;
