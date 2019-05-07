import React, { Component } from 'react';
import styles from './timeline.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export default class Tick extends Component {
  state = {
    visible: false
  };

  render() {
    const { visible } = this.state;
    return (
      <div className={styles.yearTick}>
        <div>
          <FontAwesomeIcon icon={faPlusSquare} />
        </div>
      </div>
    );
  }
}
