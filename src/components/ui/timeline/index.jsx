import React, { Component } from 'react';
import Tick from './tick';
import styles from './timeline.scss';

function getRange(start, end) {
  return [...Array(1 + end - start).keys()].map(v => start + v);
}

export default class FoldableBox extends Component {
  render() {
    const { range = [1990, 2000] } = this.props;
    const years = getRange(...range);
    console.log(years);
    return (
      <div className={styles.container}>
        <div className={styles.aboveTimeLine} />
        <ul className={styles.yearList}>
          {years.map(year => (
            <li>
              <Tick />
              <div className={styles.yearName}>{year}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
