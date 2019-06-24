import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CondensedItem from './condensedItem';
import ExpandedItem from './expandedItem';
import styles from './datasetitem.scss';

class datasetItem extends Component {
  state = { lifted: false };

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
          {title}
        </div>
        {lifted ? <ExpandedItem {...this.props} /> : <CondensedItem languages={languages} />}
      </div>
    );
  }
}

datasetItem.propTypes = {
  title: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object)
};

datasetItem.defaultProps = {
  languages: []
};

export default datasetItem;
