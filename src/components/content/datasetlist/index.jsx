import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { addToGroup, listGroups } from '../../../redux/actions/groups';
import { filterByQuery } from '../../../redux/actions/filters';
import { listAll } from '../../../redux/actions/datasets';
import { getOriginalValuesForFilters } from '../../../redux/actions/utils';
import BasicButton from '../../ui/buttons/BasicButton';
import ClusterTool from '../ClusterTool';
import DatasetItem from '../datasetitem';
import DelayedSearchField from '../../ui/DelayedSearchField';
import Filters from './filters';
import Splash from '../../layout/splash';
import styles from './datasetlist.scss';
import generalStyles from '../../../general_styles/general_styles.scss';

class DatasetList extends Component {
  filterFromQuery = '';

  state = { useGrid: false };

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
      // TODO: use cached filter values most of the time?
      dispatch(getOriginalValuesForFilters());
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

  renderDataset(dataset) {
    const { groupedDatasets, editedId, datasetVersions, clusterToolVisible, dispatch } = this.props;
    const { id, title, subversion, ...datasetDetails } = dataset;
    const { datasets: alreadyGrouped } = groupedDatasets;
    let versionId;
    const isAdded = alreadyGrouped && alreadyGrouped.find(ds => ds.dataset === id) !== undefined;
    let activeDetails = datasetDetails;
    const {
      activated: { [id]: activeId },
      all: { [id]: fetchedVersions }
    } = datasetVersions;
    if (activeId && fetchedVersions) {
      // Dataset has subversions and the subversions have been cached
      const activeVersion = fetchedVersions[activeId] || {};
      const {
        id: versionIdFromData,
        title: versionTitle,
        subversion: versionSubVersion,
        ...versionDetails
      } = activeVersion;
      activeDetails = versionDetails;
      versionId = versionIdFromData;
    }

    return (
      <DatasetItem
        {...activeDetails}
        title={title}
        key={id}
        id={id}
        subversion={subversion}
        liftedByDefault={title === this.filterFromQuery}
        wasEdited={id === editedId}
        dispatch={dispatch}
        datasetVersions={datasetVersions}
        currentVersionId={versionId}
        clusterToolVisible={clusterToolVisible}
        isAdded={isAdded}
      />
    );
  }

  render() {
    const {
      datasets,
      dispatch,
      filters,
      originalFilterValues,
      showSplash,
      clusterToolVisible,
      groupedDatasets,
      loadingState,
      groupNames
    } = this.props;

    const { useGrid } = this.state;

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
            onChange={query => this.filterDatasets(query)}
            placeholder="Hae nimellä tai avainsanalla"
            defaultValue={this.filterFromQuery}
          />
        </section>
        <Filters
          filters={filters}
          originalFilterValues={originalFilterValues}
          dispatch={dispatch}
        />
        <section className={styles.viewSelect}>
          <div className={styles.dsCount}>
            {datasets.length} aineisto{datasets.length !== 1 && 'a'}
          </div>
          <BasicButton
            text={useGrid ? 'Näytä listana' : 'Näytä ruudukkona'}
            onClick={() => this.setState({ useGrid: !useGrid })}
            iconName={useGrid ? 'faThList' : 'faThLarge'}
          />
          <BasicButton text="Järjestä" todo="Ryhmittäin" iconName="faSort" />
        </section>
        <section className={`${styles.datasetList} ${useGrid && styles.datasetListGrid}`}>
          {datasets.map(dataset => this.renderDataset(dataset))}
        </section>
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
