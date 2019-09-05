import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { addToGroup } from '../../../redux/actions/groups';
import BasicButton from '../../ui/buttons/BasicButton';
import CondensedItem from './condensedItem';
import EditMenu from './editMenu';
import ExpandedItem from './expandedItem';
import Icon from '../../ui/icon';
import Tooltip from '../../ui/tooltip';
import styles from './datasetitem.scss';

class datasetItem extends Component {
  state = { lifted: 'initial' }; // up, down

  toggleExpanded() {
    const { liftedByDefault } = this.props;
    const { lifted } = this.state;
    const isLifted = lifted === 'up' || (lifted === 'initial' && liftedByDefault);
    this.setState({ lifted: isLifted ? 'down' : 'up' });
  }

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
      history,
      datasetUsers,
      loadingState,
      documents,
      userNames,
      userDetails: { username, datasets: userDatasets, is_staff: isStaff }
    } = this.props;
    const { lifted } = this.state;
    const isLifted = lifted === 'up' || (lifted === 'initial' && liftedByDefault);
    const userRights = Array.isArray(userDatasets)
      ? userDatasets.find(ds => ds.dataset === id)
      : {};

    const togglerProps = {
      role: 'button',
      tabIndex: 0,
      onClick: () => this.toggleExpanded(),
      onKeyDown: () => this.toggleExpanded()
    };

    const containerProps = !isLifted ? { ...togglerProps } : {};
    const titleProps = isLifted ? { ...togglerProps } : {};

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
            className={`${styles.titleLine} ${!isLifted ? styles.clickable : ''}`}
            {...containerProps}
          >
            <div className={styles.title} {...titleProps}>
              {title}
            </div>
            <div>
              {isLifted && userRights && username && (
                <EditMenu
                  userNames={userNames}
                  userRights={userRights || {}}
                  isStaff={isStaff}
                  hasSubVersions={subversion.length > 0}
                  currentVersionId={currentVersionId}
                  datasetUsers={datasetUsers}
                  id={id}
                  dispatch={dispatch}
                  versionHistory={history}
                  loadingState={loadingState}
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
        {isLifted && (
          <div className={styles.bottomCorner}>
            <BasicButton
              text="pienennä"
              noBackground
              onClick={() => this.setState({ lifted: 'down' })}
            />
          </div>
        )}
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
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  isAdded: PropTypes.bool,
  setGroupView: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({ modification_time: PropTypes.string, id: PropTypes.number })
  ),
  datasetUsers: PropTypes.shape({
    [PropTypes.number]: PropTypes.arrayOf({
      username: PropTypes.string,
      can_edit: PropTypes.bool,
      can_delete: PropTypes.bool,
      can_edit_permissions: PropTypes.bool
    })
  }),
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  documents: PropTypes.arrayOf(PropTypes.object),
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired
};

datasetItem.defaultProps = {
  languages: [],
  liftedByDefault: false,
  wasEdited: false,
  currentVersionId: null,
  subversion: [],
  clusterToolVisible: false,
  isAdded: false,
  history: [],
  datasetUsers: {},
  documents: []
};

export default datasetItem;
