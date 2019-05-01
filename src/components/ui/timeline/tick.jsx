import React, { Component } from 'react';
import styles from './timeline.scss';

export default class Tick extends Component {
  state = {
    visible: false
  };

  render() {
    const { visible } = this.state;
    return (
      <div
        className={styles.yearTick}
        onMouseOver={() => {
          console.log('moro');
          this.setState({ visible: !visible });
        }}
      >
        x
      </div>
    );
  }
}
