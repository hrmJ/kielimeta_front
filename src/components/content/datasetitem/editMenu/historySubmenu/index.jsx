import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateField } from '../../../../../redux/actions/datasetform';
import BasicButton from '../../../../ui/buttons/BasicButton';
import styles from './historySubMenu.scss';

const formatTime = timestamp => {
  const dateObject = new Date(timestamp);
  return dateObject.toLocaleString('fi-FI');
};

class historySubWindow extends Component {
  launchEdit(ev, historyId) {
    const { history, id, currentVersionId, dispatch } = this.props;
    ev.stopPropagation();
    if (currentVersionId !== id) {
      dispatch(updateField('main_version_id', id));
    }
    history.push(`/edit/${currentVersionId}/${historyId}`);
  }

  render() {
    const { edits } = this.props;
    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          {edits.map(edit => (
            <li key={edit.modification_time}>
              <BasicButton
                noBackground
                onClick={ev => this.launchEdit(ev, edit.id)}
                text={formatTime(edit.modification_time)}
              />
            </li>
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  currentVersionId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default withRouter(historySubWindow);

