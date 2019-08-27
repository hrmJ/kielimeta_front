import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getOriginalValuesForFilters } from '../../../redux/actions/utils';
import { listGroups } from '../../../redux/actions/groups';
import { resetFormData } from '../../../redux/actions/datasetform';
import { unSetActiveTitle } from '../../../redux/actions/datasets';
import { updateAndFilter, filterDatasets } from '../../../redux/actions/filters';
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
  state = { useGrid: true, useGroups: false };

  activeTitle = '';

  componentDidMount() {
    const { dispatch, isTest, routeProps, groupNames, filters } = this.props;
    let activeTitle = '';
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
      dispatch(filterDatasets({}));
      // TODO: use cached filter values most of the time?
    } else if (activeTitle) {
      this.activeTitle = activeTitle;
      dispatch(updateAndFilter('query', activeTitle, true, filters));
    }
    if (groupNames.length === 0) {
      dispatch(listGroups());
    }
    dispatch(resetFormData());
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
      datasetUsers,
      loadingState,
      userDetails,
      userNames,
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
        userNames={userNames}
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
        datasetUsers={datasetUsers}
        loadingState={loadingState}
        userDetails={userDetails}
        setGroupView={() => this.setState({ useGroups: true })}
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
      languageVarieties,
      activeTitle,
      datasetPage: { currentPage, hasNext }
    } = this.props;

    const { FILTER_DATASETS: filterState } = loadingState;

    const { useGrid, useGroups } = this.state;
    console.log(activeTitle);
    console.log(this.activeTitle);

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
          linkedValue={activeTitle !== 'ACTIVE_TITLE_RESET' ? activeTitle : ''}
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
        <section
          className={`${styles.datasetList} ${useGrid &&
            filterState !== 'requested' &&
            styles.datasetListGrid}`}
        >
          {filterState === 'requested' ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : (
            this.renderList()
          )}
        </section>
        {hasNext && filterState !== 'requested' && (
          <section className={styles.moreButtonContainer}>
            <BasicButton
              text="Lataa lisää"
              onClick={() => dispatch(filterDatasets(filters, currentPage + 1))}
              iconName="faChevronCircleDown"
            />
          </section>
        )}
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
  routeProps: PropTypes.objectOf(PropTypes.any),
  datasetPage: PropTypes.shape({ currentPage: PropTypes.number, hasNext: PropTypes.bool }),
  datasetUsers: PropTypes.shape({
    [PropTypes.number]: PropTypes.arrayOf({
      username: PropTypes.string,
      can_edit: PropTypes.bool,
      can_delete: PropTypes.bool,
      can_edit_permissions: PropTypes.bool
    })
  }),
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ).isRequired,
  activeTitle: PropTypes.string.isRequired
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
  routeProps: {},
  datasetPage: { currentPage: 1, hasNext: false },
  datasetUsers: {}
};

export default withRouter(DatasetList);
