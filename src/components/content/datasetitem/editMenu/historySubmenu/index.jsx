import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './historySubMenu.scss';

const formatTime = timestamp => {
  const dateObject = new Date(timestamp);
  return dateObject.toLocaleString('fi-FI');
};

class historySubWindow extends Component {
  componentDidMount() {
    const { id, dispatch } = this.props;
    // dispatch(getDatasetHistory(id));
  }

  render() {
    const { edits } = this.props;
    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          {edits.map(edit => (
            <li key={edit.modification_time}> {formatTime(edit.modification_time)} </li>
          ))}
        </ul>
      </div>
    );
  }
}

historySubWindow.propTypes = {
  edits: PropTypes.arrayOf(
    PropTypes.shape({ modification_time: PropTypes.timestamp, id: PropTypes.number })
  ).isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default historySubWindow;
