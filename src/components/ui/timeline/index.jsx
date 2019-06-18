import React from 'react';
import styles from './timeline.scss';

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

const timeLine = props => {
  const { range, onChange, checked = false, selectedYears } = props;
  const years = getRange(...range);
  return (
    <div className={styles.container}>
      <div className={styles.aboveTimeLine} />
      <ul className={styles.yearList}>
        {years.map(year => (
          <li key={`${year}`}>
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
};

export { getRange };

export default timeLine;
