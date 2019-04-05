import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listAll } from '../../../redux/actions/datasets';
import DatasetItem from '../datasetitem';
import styles from './datasetlist.scss';

export default class DatasetList extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(listAll());
  }

  render() {
    const { datasets } = this.props;

    return (
      <div id="resources" className={styles.datasetlistContainer}>
        <div className={styles.searchBarContainer}>
          <input id="searchfield" type="text" placeholder="HAKU: TODO..." />
        </div>
        <ul>
          {datasets.map(dataset => (
            <li key={dataset.id} className={styles.datasetitemContainer}>
              <DatasetItem {...dataset} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
