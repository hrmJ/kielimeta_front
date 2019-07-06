import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
      subversion
    } = this.props;
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
                <Icon iconName="faCheck" /> Tallennettu
              </div>
            )}
          </div>

          <div>
            {isLifted && (
              <EditMenu
                hasSubVersions={subversion.length > 0}
                currentVersionId={currentVersionId}
                id={id}
                dispatch={dispatch}
              />
            )}
          </div>
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
  currentVersionId: PropTypes.number,
  liftedByDefault: PropTypes.bool,
  wasEdited: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  subversion: PropTypes.arrayOf(PropTypes.number)
};

datasetItem.defaultProps = {
  languages: [],
  liftedByDefault: false,
  wasEdited: false,
  currentVersionId: null,
  subversion: []
};

export default datasetItem;
