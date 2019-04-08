import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listAll, filterByQuery } from '../../../redux/actions/datasets';
import DatasetItem from '../datasetitem';
import styles from './datasetlist.scss';

export default class DatasetList extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      datasets: PropTypes.arrayOf(PropTypes.object).isRequired
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(listAll());
  }

  filterDatasets(query) {
    const { dispatch } = this.props;
    dispatch(filterByQuery(query));
  }

  render() {
    const { datasets } = this.props;

    return (
      <div id="resources" className={styles.datasetlistContainer}>
        <div className={styles.searchBarContainer}>
          <input
            id="searchfield"
            type="text"
            onChange={ev => this.filterDatasets(ev.target.value)}
            placeholder="Hae nimellä, x:llä..."
          />
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
