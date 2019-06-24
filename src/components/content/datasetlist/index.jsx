import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { listAll, filterByQuery } from '../../../redux/actions/datasets';
import DatasetItem from '../datasetitem';
import DelayedSearchField from '../../ui/DelayedSearchField';
import Filters from './filters';
import styles from './datasetlist.scss';
import utilityStyles from '../../../general_styles/utilities.scss';

class DatasetList extends Component {
  componentDidMount() {
    const { dispatch, isTest } = this.props;
    if (!isTest) {
      dispatch(listAll());
    }
  }

  filterDatasets(query) {
    const { dispatch, filters } = this.props;
    dispatch(filterByQuery({ ...filters, query }));
  }

  render() {
    const { datasets, dispatch, filters, originalFilterValues, datasetStatus } = this.props;
    console.log(datasetStatus);

    return (
      <div id="resources" className={styles.datasetlistContainer}>
        <section className={styles.searchBarContainer}>
          <DelayedSearchField
            id="searchfield"
            onChange={this.filterDatasets.bind(this)}
            placeholder="Hae nimellä tai avainsanalla"
          />
        </section>
        {datasetStatus !== 'loading' ? (
          <div>
            <Filters
              dsLength={datasets.length}
              filters={filters}
              originalFilterValues={originalFilterValues}
              dispatch={dispatch}
            />
            <ul className={styles.datasetList}>
              {datasets.map(dataset => (
                <li key={dataset.id} className={styles.datasetitemContainer}>
                  <DatasetItem {...dataset} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={utilityStyles.loading}> Haetaan tietoja</div>
        )}
      </div>
    );
  }
}

DatasetList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  datasets: PropTypes.arrayOf(PropTypes.object),
  datasetStatus: PropTypes.string,
  originalFilterValues: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  isTest: PropTypes.bool
};

DatasetList.defaultProps = {
  datasetStatus: '',
  originalFilterValues: {},
  filters: {},
  datasets: [],
  isTest: false
};

export default DatasetList;
