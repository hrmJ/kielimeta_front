import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CondensedItem from './condensedItem';
import Edit from '../../ui/buttons/edit';
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
          <div>{lifted && <Edit onClick={ev => this.edit(ev)} text="Muokkaa tietoja" />}</div>
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
