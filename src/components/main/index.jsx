import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component, lazy, Suspense } from 'react';

import { getCookie } from '../../utils';
import { getUserDetails } from '../../redux/actions/users';
import Admin from '../content/admin';
import DataProtection from '../content/DataProtection';
import Footer from '../layout/footer';
import JsonInput from '../content/jsonInput';
import Login from '../auth/login';
import Logout from '../auth/logout';
import TopBar from '../layout/navigation/topbar';
import UserPicker from '../content/userPicker';
import styles from '../../general_styles/general_styles.scss';

const DatasetList = lazy(() =>
  import(/* webpackChunkName: "datasetList" */ '../content/datasetlist')
);

const DatasetForm = lazy(() =>
  import(/* webpackChunkName: "datasetForm" */ '../content/datasetform')
);

class main extends Component {
  state = { clusterToolVisible: false };

  componentDidMount() {
    const { userDetails, dispatch } = this.props;
    const user = getCookie('current_user');
    if (user && typeof user === 'string') {
      if (!userDetails.username || userDetails.username !== user) {
        dispatch(getUserDetails(user.replace(/"/g, '')));
      }
    }
  }

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
      datasetPage,
      datasetUsers,
      userDetails,
      datasetDocuments,
      userNames,
      userPicker,
      datasetTitles,
      activeTitle,
      adminData
    } = this.props;
    const { clusterToolVisible } = this.state;
    const { datasetList, datasetDetails } = loadStatus;
    let showSplash = false;

    // const userDatasets = getCookie('user_datasets');
    // const token = getCookie('jwt_token_access');

    if (datasetList === 'loading' || datasetDetails === 'loading') {
      showSplash = true;
    }

    return (
      <BrowserRouter>
        <Suspense fallback={<div style={{ backround: 'black' }} />}>
          <div>
            <div className={styles.outerContainer}>
              {!showSplash && (
                <TopBar
                  toggleClusterTool={() => this.toggleClusterTool()}
                  userDetails={userDetails}
                  dispatch={dispatch}
                  datasetTitles={datasetTitles}
                />
              )}
              <main>
                <Switch>
                  <Route
                    path="/jsoninput"
                    render={() => <JsonInput dispatch={dispatch} datasetform={datasetform} />}
                    exact
                  />
                  <Route
                    path="/admin"
                    render={() => (
                      <Admin dispatch={dispatch} {...adminData} loadingState={loadingState} />
                    )}
                    exact
                  />
                  <Route path="/login" render={() => <Login />} exact />
                  <Route path="/logout" render={() => <Logout />} exact />
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
                        datasetDocuments={datasetDocuments}
                        userNames={userNames}
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
                        datasetDocuments={datasetDocuments}
                        userNames={userNames}
                      />
                    )}
                    exact
                  />
                  <Route
                    path="/:title?"
                    render={routeProps => (
                      <DatasetList
                        userNames={userNames}
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
                        datasetUsers={datasetUsers}
                        userDetails={userDetails}
                        activeTitle={activeTitle}
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
  datasetDocuments: PropTypes.arrayOf(PropTypes.any),
  groupedDatasets: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, role: PropTypes.string })
    ),
    name: PropTypes.string
  }),
  datasetVersions: PropTypes.shape({ activated: PropTypes.object, all: PropTypes.object }),
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.any),
    is_staff: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string)
  }),
  userNames: PropTypes.arrayOf(
    PropTypes.shape({ cn: PropTypes.string, mail: PropTypes.string, uid: PropTypes.string })
  ),
  datasetTitles: PropTypes.objectOf(PropTypes.any),
  adminData: PropTypes.objectOf(PropTypes.any),
  activeTitle: PropTypes.string
};

main.defaultProps = {
  filters: {},
  originalFilterValues: {},
  languageVarieties: {},
  languageVarietyTypes: [],
  languageNames: {},
  preloadedSelects: {},
  datasets: [],
  datasetDocuments: [],
  editedId: null,
  groupedDatasets: {},
  groupNames: [],
  datasetVersions: { activated: {}, all: {} },
  userDetails: {},
  userNames: [],
  datasetTitles: {},
  activeTitle: '',
  adminData: {}
};

export default main;
