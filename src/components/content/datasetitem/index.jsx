import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import CondensedItem from './condensedItem';
import ExpandedItem from './expandedItem';
import styles from './datasetitem.scss';

class datasetItem extends Component {
  state = { lifted: false };

  edit(ev) {
    const { id } = this.props;
    ev.preventDefault();
    this.props.history.push(`/edit/${id}`);
  }

  render() {
    const { title, languages } = this.props;
    const { lifted } = this.state;

    return (
      <div className={lifted ? styles.liftedItem : styles.datasetItem}>
        <div
          role="button"
          tabIndex={0}
          className={styles.titleLine}
          onClick={() => this.setState({ lifted: !lifted })}
          onKeyDown={() => this.setState({ lifted: !lifted })}
        >
          <div className={styles.title}>{title}</div>
          <div>
            {lifted && (
              <button type="button" onClick={ev => this.edit(ev)}>
                Muokkaa tietoja
              </button>
            )}
          </div>
        </div>
        {lifted ? <ExpandedItem {...this.props} /> : <CondensedItem languages={languages} />}
      </div>
    );
  }
}

datasetItem.propTypes = {
  title: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number.isRequired
};

datasetItem.defaultProps = {
  languages: []
};

export default withRouter(datasetItem);
