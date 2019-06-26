import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { faCheck as checkIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CondensedItem from './condensedItem';
import Edit from '../../ui/buttons/edit';
import ExpandedItem from './expandedItem';
import styles from './datasetitem.scss';

class datasetItem extends Component {
  state = { lifted: 'initial' }; // up, down

  edit(ev) {
    const { id } = this.props;
    ev.preventDefault();
    this.props.history.push(`/edit/${id}`);
  }

  render() {
    const { title, languages, liftedByDefault, wasEdited } = this.props;
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

          <div>{isLifted && <Edit onClick={ev => this.edit(ev)} text="Muokkaa tietoja" />}</div>
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
  wasEdited: PropTypes.bool
};

datasetItem.defaultProps = {
  languages: [],
  liftedByDefault: false,
  wasEdited: false
};

export default withRouter(datasetItem);
