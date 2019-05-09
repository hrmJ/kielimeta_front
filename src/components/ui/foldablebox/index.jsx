import React, { Component } from 'react';
import styles from './foldablebox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import TimelineChart from '../../ui/timeline/chart';

export default class FoldableBox extends Component {
  state = {
    open: false
  };

  render() {
    const {
      items = [],
      header = '',
      children = '',
      launchertype = 'button',
      headerclass,
      id
    } = this.props;
    const { open } = this.state;
    // const open = true;
    let launcher = (
      <button className={styles.orderButton} onClick={() => this.setState({ open: !open })}>
        <FontAwesomeIcon icon={open ? faCaretDown : faCaretRight} />
        {header}
      </button>
    );
    if (launchertype == 'heading') {
      launcher = (
        <h4
          className={`${styles.orderHeading} ${headerclass}`}
          onClick={() => this.setState({ open: !open })}
        >
          <FontAwesomeIcon icon={open ? faCaretDown : faCaretRight} />
          {header}
        </h4>
      );
    }
    // TODO: move the visiblity definitions out of inline style attr
    // NOTE: can't use display:block because of react-vis's flexiblXYplot

    return (
      <div className={styles.container} id={id}>
        {launcher}
        <div
          className={styles.dropDown}
          style={
            open ? { height: 'auto', visibility: 'visible' } : { height: '0', visibility: 'hidden' }
          }
        >
          {children}
        </div>
      </div>
    );
  }
}
