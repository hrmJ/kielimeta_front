import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { listAll, filterByQuery } from '../../../redux/actions/datasets';
import DatasetItem from '../datasetitem';
import DelayedSearchField from '../../ui/DelayedSearchField';
import Filters from './filters';
import Splash from '../../layout/splash';
import styles from './datasetlist.scss';

class DatasetList extends Component {
  filterFromQuery = '';

  componentDidMount() {
    const { dispatch, isTest, routeProps } = this.props;
    let activeTitle;
    if (routeProps.match) {
      const {
        match: {
          params: { title }
        }
      } = routeProps;
      if (title) {
        activeTitle = title;
        this.filterFromQuery = activeTitle;
      }
    }
    if (!isTest && !activeTitle) {
      dispatch(listAll());
    } else if (activeTitle) {
      this.filterDatasets(activeTitle);
    }
  }

  filterDatasets(query) {
    const { dispatch, filters } = this.props;
    dispatch(filterByQuery({ ...filters, query }));
  }

  render() {
    const { datasets, dispatch, filters, originalFilterValues, showSplash } = this.props;

    if (showSplash) {
      return <Splash />;
    }

    return (
      <div id="resources" className={styles.datasetlistContainer}>
        <section className={styles.searchBarContainer}>
          <DelayedSearchField
            id="searchfield"
            onChange={this.filterDatasets.bind(this)}
            placeholder="Hae nimellä tai avainsanalla"
            defaultValue={this.filterFromQuery}
          />
        </section>
        <Filters
          dsLength={datasets.length}
          filters={filters}
          originalFilterValues={originalFilterValues}
          dispatch={dispatch}
        />
        <ul className={styles.datasetList}>
          {datasets.map(dataset => {
            return (
              <li key={dataset.id} className={styles.datasetitemContainer}>
                <DatasetItem
                  {...dataset}
                  liftedByDefault={dataset.title === this.filterFromQuery}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

DatasetList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  datasets: PropTypes.arrayOf(PropTypes.object),
  showSplash: PropTypes.bool,
  originalFilterValues: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  isTest: PropTypes.bool
};

DatasetList.defaultProps = {
  originalFilterValues: {},
  filters: {},
  datasets: [],
  isTest: false,
  showSplash: false
};

export default withRouter(DatasetList);
