import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { filterByQuery, updateAndFilter } from '../../../redux/actions/filters';
import { getOriginalValuesForFilters } from '../../../redux/actions/utils';
import { listAll } from '../../../redux/actions/datasets';
import { listGroups } from '../../../redux/actions/groups';
import BasicButton from '../../ui/buttons/BasicButton';
import ClusterTool from '../ClusterTool';
import DatasetItem from '../datasetitem';
import Filters from './filters';
import Loader from '../../ui/loader';
import OrderMenu from '../orderMenu';
import SearchBar from '../../ui/SearchBar';
import Splash from '../../layout/splash';
import styles from './datasetlist.scss';

class DatasetList extends Component {
  state = { useGrid: false, useGroups: false };

  activeTitle = '';

  componentDidMount() {
    const { dispatch, isTest, routeProps, groupNames, filters } = this.props;
    let activeTitle;
    if (routeProps.match) {
      const {
        match: {
          params: { title }
        }
      } = routeProps;
      if (title) {
        activeTitle = title;
      }
    }
    dispatch(getOriginalValuesForFilters());
    if (!isTest && !activeTitle) {
      dispatch(listAll());
      // TODO: use cached filter values most of the time?
    } else if (activeTitle) {
      this.activeTitle = activeTitle;
      dispatch(updateAndFilter('query', activeTitle, true, filters));
    }
    if (groupNames.length === 0) {
      dispatch(listGroups());
    }
  }

  renderList() {
    const { datasets, groupNames } = this.props;
    const { useGrid, useGroups } = this.state;
    let dataSetsInGroups = [];
    const groupedDatasets = [];
    if (useGroups) {
      groupNames.forEach(thisGroup => {
        const { datasets: datasetsInThisGroup } = thisGroup;
        const ids = datasetsInThisGroup.reduce((prev, thisDs) => [...prev, thisDs.dataset], []);
        dataSetsInGroups = [...dataSetsInGroups, ...ids];
        groupedDatasets.push({
          title: thisGroup.name,
          ds: datasets.filter(ds => ids.includes(ds.id)).map(dataset => this.renderDataset(dataset))
        });
      });
      groupedDatasets.push({
        title: 'Yksittäiset aineistot',
        ds: datasets
          .filter(ds => !dataSetsInGroups.includes(ds.id))
          .map(dataset => this.renderDataset(dataset))
      });
      return groupedDatasets
        .filter(group => Array.isArray(group.ds) && group.ds.length > 0)
        .map(group => (
          <section key={group.title} className={styles.groupContainer}>
            <div className={styles.groupTitle}>{group.title}</div>
            <div className={`${styles.groupedDatasets} ${useGrid && styles.groupedDatasetsGrid}`}>
              {group.ds}
            </div>
          </section>
        ));
    }
    return datasets.map(dataset => this.renderDataset(dataset));
  }

  renderDataset(dataset) {
    const {
      groupedDatasets,
      editedId,
      datasetVersions,
      clusterToolVisible,
      dispatch,
      routeProps: {
        match: {
          params: { title: activeTitle }
        }
      }
    } = this.props;
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
        liftedByDefault={title === this.activeTitle}
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
      groupNames,
      languageVarieties
    } = this.props;

    const { FILTER_DATASETS: filterState } = loadingState;

    const { useGrid, useGroups } = this.state;

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
        <SearchBar
          id="searchfield"
          onChange={query => dispatch(updateAndFilter('query', query, true, filters))}
          placeholder="Hae nimellä tai avainsanalla"
          value={filters.query}
          initialValue={this.activeTitle}
          filters={filters}
          dispatch={dispatch}
        />
        <Filters
          filters={filters}
          originalFilterValues={originalFilterValues}
          dispatch={dispatch}
          languageVarieties={languageVarieties}
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
          <BasicButton
            text={useGroups ? 'Näytä yksittäin' : 'Näytä ryhminä'}
            onClick={() => this.setState({ useGroups: !useGroups })}
          />
          <OrderMenu dispatch={dispatch} filters={filters} />
        </section>
        <section className={`${styles.datasetList} ${useGrid && styles.datasetListGrid}`}>
          {filterState === 'requested' ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : (
            this.renderList()
          )}
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
  datasetVersions: PropTypes.shape({ activated: PropTypes.object, all: PropTypes.object }),
  languageVarieties: PropTypes.objectOf(PropTypes.any),
  routeProps: PropTypes.objectOf(PropTypes.any)
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
  datasetVersions: { activated: {}, all: {} },
  languageVarieties: {},
  routeProps: {}
};

export default withRouter(DatasetList);
