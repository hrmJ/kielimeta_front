import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './historySubMenu.scss';

class historySubWindow extends Component {
  componentDidMount() {
    const { id, dispatch } = this.props;
    dispatch(getDatasetHistory(id));
  }

  render() {
    const { edits } = this.props;
    return (
      <div className={styles.container}>
        morormororormro
        <ul>
          {edits.map(edit => (
            <li key={edit.modification_date}> {edit.modification_date} </li>
          ))}
        </ul>
      </div>
    );
  }
}

historySubWindow.propTypes = {
  edits: PropTypes.arrayOf(PropTypes.any),
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

historySubWindow.defaultProps = {
  edits: []
};

export default historySubWindow;
