import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { faCheck as checkIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CondensedItem from './condensedItem';
import EditMenu from './editMenu';
import ExpandedItem from './expandedItem';
import styles from './datasetitem.scss';

class datasetItem extends Component {
  state = { lifted: 'initial' }; // up, down

  render() {
    const { title, languages, liftedByDefault, wasEdited, id, dispatch } = this.props;
    const { lifted } = this.state;
    const isLifted = lifted === 'up' || (lifted === 'initial' && liftedByDefault);

    return (
      <div className={isLifted ? styles.liftedItem : styles.datasetItem}>
        <div
          role="button"
          tabIndex={0}
          className={styles.titleLine}
          onClick={() => this.setState({ lifted: isLifted ? 'down' : 'up' })}
          onKeyDown={() => this.setState({ lifted: isLifted ? 'down' : 'up' })}
        >
          <div className={styles.title}>{title}</div>
          <div>
            {isLifted && wasEdited && (
              <div className={styles.savedIndicator}>
                <FontAwesomeIcon icon={checkIcon} /> Muutokset tallennettu
              </div>
            )}
          </div>

          <div>{isLifted && <EditMenu id={id} dispatch={dispatch} />}</div>
        </div>
        {isLifted ? <ExpandedItem {...this.props} /> : <CondensedItem languages={languages} />}
      </div>
    );
  }
}

datasetItem.propTypes = {
  title: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number.isRequired,
  liftedByDefault: PropTypes.bool,
  wasEdited: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

datasetItem.defaultProps = {
  languages: [],
  liftedByDefault: false,
  wasEdited: false
};

export default datasetItem;
