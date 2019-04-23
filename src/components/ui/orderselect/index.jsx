import React, { Component } from 'react';
import styles from './orderselect.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default class OrderSelect extends Component {
  state = {
    open: false
  };

  render() {
    const { items = [] } = this.props;
    const { open } = this.state;
    return (
      <div className={styles.container}>
        <button className={styles.orderButton} onClick={() => this.setState({ open: !open })}>
          <FontAwesomeIcon icon={open ? faCaretDown : faCaretRight} />
          <div>Järjestä</div>
        </button>
        <div className={styles.dropDown} style={{ display: open ? 'block' : 'none' }}>
          <ul>
            {items.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
