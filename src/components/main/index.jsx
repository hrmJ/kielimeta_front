import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component, Suspense, lazy } from 'react';

import DataProtection from '../content/DataProtection';
import Footer from '../layout/footer';
import JsonInput from '../content/jsonInput';
import Login from '../auth/login';
import PermissionForm from '../content/PermissionForm';
import TopBar from '../layout/navigation/topbar';
import styles from '../../general_styles/general_styles.scss';

const DatasetList = lazy(() =>
  import(/* webpackChunkName: "datasetList" */ '../content/datasetlist')
);

const DatasetForm = lazy(() =>
  import(/* webpackChunkName: "datasetForm" */ '../content/datasetform')
);

class main extends Component {
  state = { clusterToolVisible: false };

  toggleClusterTool() {
    const { clusterToolVisible } = this.state;
    this.setState({ clusterToolVisible: !clusterToolVisible });
  }

  render() {
    const {
      dispatch,
      datasetform,
      loadingState,
      filters,
      originalFilterValues,
      languageVarieties,
      languageVarietyTypes,
      languageNames,
      preloadedSelects,
      loadStatus,
      datasets,
      editedId,
      groupedDatasets,
      groupNames,
      datasetVersions,
      datasetPage
    } = this.props;
    const { clusterToolVisible } = this.state;
    const { datasetList, datasetDetails } = loadStatus;
    let showSplash = false;

    // const token = getCookie('jwt_token_access');

    if (datasetList === 'loading' || datasetDetails === 'loading') {
      showSplash = true;
    }

    return (
      <BrowserRouter>
        <Suspense fallback={<div style={{ backround: 'black' }} />}>
          <div>
            <div className={styles.outerContainer}>
              {!showSplash && <TopBar toggleClusterTool={() => this.toggleClusterTool()} />}
              <main>
                <Switch>
                  <Route
                    path="/jsoninput"
                    render={() => <JsonInput dispatch={dispatch} datasetform={datasetform} />}
                    exact
                  />
                  <Route
                    path="/test"
                    render={() => (
                      <PermissionForm
                        dispatch={dispatch}
                        id={1}
                        datasetUsers={datasetform.datasetUsers}
                      />
                    )}
                    exact
                  />
                  <Route path="/login" render={() => <Login />} exact />
                  <Route path="/tietosuojaseloste" render={() => <DataProtection />} exact />
                  <Route path="/dataprotection" render={() => <DataProtection />} exact />
                  <Route
                    path="/newdataset/:source?"
                    render={routeProps => (
                      <DatasetForm
                        fields={datasetform}
                        loadingState={loadingState}
                        dispatch={dispatch}
                        languageVarieties={languageVarieties}
                        languageVarietyTypes={languageVarietyTypes}
                        preloadedSelects={preloadedSelects}
                        languageNames={languageNames}
                        routeProps={routeProps}
                      />
                    )}
                    exact
                  />
                  <Route
                    path="/edit/:id/:versionId?"
                    render={routeProps => (
                      <DatasetForm
                        routeProps={routeProps}
                        fields={datasetform}
                        loadingState={loadingState}
                        dispatch={dispatch}
                        languageVarieties={languageVarieties}
                        languageVarietyTypes={languageVarietyTypes}
                        preloadedSelects={preloadedSelects}
                        languageNames={languageNames}
                        showSplash={showSplash}
                        datasets={datasets}
                      />
                    )}
                    exact
                  />
                  <Route
                    path="/:title?"
                    render={routeProps => (
                      <DatasetList
                        groupNames={groupNames}
                        groupedDatasets={groupedDatasets}
                        clusterToolVisible={clusterToolVisible}
                        routeProps={routeProps}
                        datasets={datasets}
                        dispatch={dispatch}
                        filters={filters}
                        originalFilterValues={originalFilterValues}
                        showSplash={showSplash}
                        loadingState={loadingState}
                        editedId={editedId}
                        datasetVersions={datasetVersions}
                        languageVarieties={languageVarieties}
                        datasetPage={datasetPage}
                        datasetUsers={datasetform.datasetUsers}
                      />
                    )}
                    exact
                  />
                </Switch>
              </main>
            </div>
          </div>
          {!showSplash && <Footer />}
        </Suspense>
      </BrowserRouter>
    );
  }
}

main.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
  datasetform: PropTypes.objectOf(PropTypes.any).isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  filters: PropTypes.objectOf(PropTypes.any),
  originalFilterValues: PropTypes.objectOf(PropTypes.any),
  languageVarieties: PropTypes.objectOf(PropTypes.any),
  languageVarietyTypes: PropTypes.arrayOf(PropTypes.string),
  groupNames: PropTypes.arrayOf(PropTypes.object),
  languageNames: PropTypes.objectOf(PropTypes.any),
  preloadedSelects: PropTypes.objectOf(PropTypes.any),
  editedId: PropTypes.number,
  groupedDatasets: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, role: PropTypes.string })
    ),
    name: PropTypes.string
  }),
  datasetVersions: PropTypes.shape({ activated: PropTypes.object, all: PropTypes.object })
};

main.defaultProps = {
  filters: {},
  originalFilterValues: {},
  languageVarieties: {},
  languageVarietyTypes: [],
  languageNames: {},
  preloadedSelects: {},
  datasets: [],
  editedId: null,
  groupedDatasets: {},
  groupNames: [],
  datasetVersions: { activated: {}, all: {} }
};

export default main;
