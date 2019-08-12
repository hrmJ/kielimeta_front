import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { addToGroup } from '../../../redux/actions/groups';
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
      loadingState
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
          <Tooltip content={isLifted ? '' : 'Klikkaa aineiston nimeä saadaksesi laajemman näkymän'}>
            <div className={styles.titleLine}>
              <Tooltip content={!isLifted ? '' : 'Kutista aineisto klikkaamalla nimeä'}>
                <div
                  className={styles.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => this.toggleExpanded()}
                  onKeyDown={() => this.toggleExpanded()}
                >
                  {title}
                </div>
              </Tooltip>

              <div>
                {isLifted && (
                  <EditMenu
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
          </Tooltip>
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
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  isAdded: PropTypes.bool,
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
  })
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
  datasetUsers: {}
};

export default datasetItem;
