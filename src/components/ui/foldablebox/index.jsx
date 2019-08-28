import React, { Component } from 'react';

import Icon from '../icon';
import styles from './foldablebox.scss';

export default class FoldableBox extends Component {
  state = {
    open: false
  };

  setVisibilityStyle() {
    const { open } = this.state;
    const { useHack } = this.props;
    if (useHack) {
      return open
        ? { height: 'auto', visibility: 'visible', overflow: 'hidden' }
        : { height: '0', visibility: 'hidden', overflow: 'hidden' };
    }
    return open ? { display: 'block' } : { display: 'none' };
  }

  render() {
    const {
      items = [],
      header = '',
      children = '',
      launchertype = 'button',
      headerclass,
      id,
      onOpen = () => null
    } = this.props;
    const { open } = this.state;
    // const open = true;
    let launcher = (
      <button
        className={styles.orderButton}
        type="button"
        onClick={() => {
          onOpen();
          this.setState({ open: !open });
        }}
      >
        <Icon iconName={open ? 'faCaretDown' : 'faCaretRight'} />
        {header}
      </button>
    );
    if (launchertype == 'heading') {
      launcher = (
        <h4
          className={`${styles.orderHeading} ${headerclass}`}
          onClick={() => this.setState({ open: !open })}
        >
          <Icon iconName={open ? 'faCaretDown' : 'faCaretRight'} />
          {header}
        </h4>
      );
    }
    // TODO: move the visiblity definitions out of inline style attr
    // NOTE: can't use display:block because of react-vis's flexiblXYplot

    return (
      <div className={styles.container} id={id}>
        {launcher}
        <div className={styles.dropDown} style={this.setVisibilityStyle()}>
          {children}
        </div>
      </div>
    );
  }
}
