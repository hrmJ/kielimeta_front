import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Tick from './tick';
import styles from './timeline.scss';

function getRange(start, end) {
  return [...Array(1 + end - start).keys()].map(v => start + v);
}

export default class TimeLine extends Component {
  render() {
    const { range = [1810, 2000] } = this.props;
    const years = getRange(...range);
    return (
      <div className={styles.container}>
        <div className={styles.aboveTimeLine} />
        <ul className={styles.yearList}>
          {years.map(year => (
            <li>
              <input type="checkbox" />
              <div className={styles.yearName}>{year}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
