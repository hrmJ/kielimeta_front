import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { addToGroup } from '../../../redux/actions/groups';
import CondensedItem from './condensedItem';
import EditMenu from './editMenu';
import ExpandedItem from './expandedItem';
import Icon from '../../ui/icon';
import styles from './datasetitem.scss';

class datasetItem extends Component {
  state = { lifted: 'initial' }; // up, down

  render() {
    const {
      title,
      languages,
      liftedByDefault,
      wasEdited,
      id,
      dispatch,
      currentVersionId,
      subversion,
      clusterToolVisible,
      isAdded,
      history
    } = this.props;
    const { lifted } = this.state;
    const isLifted = lifted === 'up' || (lifted === 'initial' && liftedByDefault);

    return (
      <article className={` ${styles.container} ${isLifted && styles.liftedContainer}`}>
        {clusterToolVisible && (
          <div>
            <input
              type="checkbox"
              checked={isAdded}
              onChange={() => dispatch(addToGroup({ dataset: id, title, role: '' }, !isAdded))}
            />
          </div>
        )}
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
              {isLifted && (
                <EditMenu
                  hasSubVersions={subversion.length > 0}
                  currentVersionId={currentVersionId}
                  id={id}
                  dispatch={dispatch}
                  versionHistory={history}
                />
              )}
            </div>
          </div>
          <div>
            {isLifted && wasEdited && (
              <div className={styles.savedIndicator}>
                <Icon iconName="faCheck" /> Tallennettu
              </div>
            )}
          </div>
          {isLifted ? <ExpandedItem {...this.props} /> : <CondensedItem languages={languages} />}
        </div>
      </article>
    );
  }
}

datasetItem.propTypes = {
  title: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number.isRequired,
  currentVersionId: PropTypes.number,
  liftedByDefault: PropTypes.bool,
  wasEdited: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  subversion: PropTypes.arrayOf(PropTypes.number),
  clusterToolVisible: PropTypes.bool,
  isAdded: PropTypes.bool,
  history: PropTypes.arrayOf(
    PropTypes.shape({ modification_time: PropTypes.string, id: PropTypes.number })
  )
};

datasetItem.defaultProps = {
  languages: [],
  liftedByDefault: false,
  wasEdited: false,
  currentVersionId: null,
  subversion: [],
  clusterToolVisible: false,
  isAdded: false,
  history: []
};

export default datasetItem;
