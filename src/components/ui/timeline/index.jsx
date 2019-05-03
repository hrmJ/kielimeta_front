import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Tick from './tick';
import styles from './timeline.scss';
import cuid from 'cuid';

function getRange(start, end) {
  start = Math.abs(start) === Infinity ? undefined : start;
  end = Math.abs(end) === Infinity ? undefined : end;
  if (start && end) {
    return [...Array(1 + end - start).keys()].map(v => start + v);
  } else if (start || end) {
    return [start || end];
  }
  return [];
}

export default class TimeLine extends Component {
  render() {
    const { range, onChange, checked = false, selectedYears } = this.props;
    const years = getRange(...range);
    return (
      <div className={styles.container}>
        <div className={styles.aboveTimeLine} />
        <ul className={styles.yearList}>
          {years.map(year => (
            <li>
              <input
                type="checkbox"
                checked={selectedYears.includes(year)}
                value={year}
                onChange={onChange}
              />
              <div className={styles.yearName}>{year}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export { getRange };
