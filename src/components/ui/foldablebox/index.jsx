import React, { Component } from 'react';
import styles from './foldablebox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default class FoldableBox extends Component {
  state = {
    open: false
  };

  render() {
    const { items = [], header = '', children = '', launchertype = 'button' } = this.props;
    const { open } = this.state;
    let launcher = (
      <button className={styles.orderButton} onClick={() => this.setState({ open: !open })}>
        <FontAwesomeIcon icon={open ? faCaretDown : faCaretRight} />
        {header}
      </button>
    );
    if (launchertype == 'heading') {
      launcher = (
        <h4 className={styles.orderHeading} onClick={() => this.setState({ open: !open })}>
          <FontAwesomeIcon icon={open ? faCaretDown : faCaretRight} />
          {header}
        </h4>
      );
    }
    return (
      <div className={styles.container}>
        {launcher}
        <div className={styles.dropDown} style={{ display: open ? 'block' : 'none' }}>
          {children}
        </div>
      </div>
    );
  }
}
