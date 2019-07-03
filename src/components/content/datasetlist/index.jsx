import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { addToGroup, listGroups } from '../../../redux/actions/groups';
import { filterByQuery } from '../../../redux/actions/filters';
import { listAll } from '../../../redux/actions/datasets';
import ClusterTool from '../ClusterTool';
import DatasetItem from '../datasetitem';
import DelayedSearchField from '../../ui/DelayedSearchField';
import Filters from './filters';
import Splash from '../../layout/splash';
import styles from './datasetlist.scss';

class DatasetList extends Component {
  filterFromQuery = '';

  componentDidMount() {
    const { dispatch, isTest, routeProps, groupNames } = this.props;
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
    if (groupNames.length === 0) {
      dispatch(listGroups());
    }
  }

  filterDatasets(query) {
    const { dispatch, filters } = this.props;
    dispatch(filterByQuery({ ...filters, query }));
  }

  render() {
    const {
      datasets,
      dispatch,
      filters,
      originalFilterValues,
      showSplash,
      editedId,
      clusterToolVisible,
      groupedDatasets,
      loadingState,
      groupNames,
      datasetVersions
    } = this.props;

    if (showSplash) {
      return <Splash />;
    }

    return (
      <div id="resources" className={styles.datasetlistContainer}>
        {clusterToolVisible && (
          <ClusterTool
            groupedDatasets={groupedDatasets}
            dispatch={dispatch}
            loadingState={loadingState}
            groupNames={groupNames}
          />
        )}
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
            const { id, title, subversion, ...datasetDetails } = dataset;
            const { datasets: alreadyGrouped } = groupedDatasets;
            const isAdded =
              alreadyGrouped && alreadyGrouped.find(ds => ds.dataset === id) !== undefined;
            let activeDetails = datasetDetails;
            if (dataset.subversion.length > 0) {
              const {
                activated: { [id]: activeId },
                all: { [id]: fetchedVersions }
              } = datasetVersions;
              if (activeId && fetchedVersions) {
                // Dataset has subversions and the subversions have been cached
                const activeVersion = fetchedVersions[activeId];
                const {
                  id: versionId,
                  title: versionTitle,
                  subversion: versionSubVersion,
                  ...versionDetails
                } = activeVersion;
                activeDetails = versionDetails;
              }
            }
            return (
              <li key={id} className={styles.datasetitemContainer}>
                {clusterToolVisible && (
                  <div className={styles.datasetItemMargin}>
                    <input
                      type="checkbox"
                      checked={isAdded}
                      onChange={() =>
                        dispatch(addToGroup({ dataset: id, title, role: '' }, !isAdded))
                      }
                    />
                  </div>
                )}
                <div className={styles.datasetItem}>
                  <DatasetItem
                    {...activeDetails}
                    title={title}
                    id={id}
                    subversion={subversion}
                    liftedByDefault={title === this.filterFromQuery}
                    wasEdited={id === editedId}
                    dispatch={dispatch}
                    datasetVersions={datasetVersions}
                  />
                </div>
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
  isTest: PropTypes.bool,
  editedId: PropTypes.number,
  clusterToolVisible: PropTypes.bool,
  groupedDatasets: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, role: PropTypes.string })
    ),
    name: PropTypes.string
  }),
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  groupNames: PropTypes.arrayOf(PropTypes.object),
  datasetVersions: PropTypes.shape({ activated: PropTypes.object, all: PropTypes.object })
};

DatasetList.defaultProps = {
  originalFilterValues: {},
  filters: {},
  datasets: [],
  isTest: false,
  showSplash: false,
  editedId: null,
  clusterToolVisible: false,
  groupedDatasets: [],
  groupNames: [],
  datasetVersions: { activated: {}, all: {} }
};

export default withRouter(DatasetList);
