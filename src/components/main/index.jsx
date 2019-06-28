import { HashRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DatasetForm from '../content/datasetform';
import DatasetList from '../content/datasetlist';
import Footer from '../layout/footer';
import LabelledInput from '../ui/labelledinput';
import Login from '../auth/login';
import TopBar from '../layout/navigation/topbar';
import styles from '../../general_styles/general_styles.scss';

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
      groupedDatasets
    } = this.props;
    const { clusterToolVisible } = this.state;
    const { datasetList, datasetDetails } = loadStatus;
    let showSplash = false;

    // const token = getCookie('jwt_token_access');

    if (datasetList === 'loading' || datasetDetails === 'loading') {
      showSplash = true;
    }

    return (
      <HashRouter>
        <div>
          <div className={styles.outerContainer}>
            {!showSplash && <TopBar toggleClusterTool={() => this.toggleClusterTool()} />}
            <main>
              <Switch>
                <Route path="/test" render={() => <LabelledInput label="Testi" />} />
                <Route path="/login" render={() => <Login />} />
                <Route
                  path="/newdataset"
                  render={() => (
                    <DatasetForm
                      fields={datasetform}
                      loadingState={loadingState}
                      dispatch={dispatch}
                      languageVarieties={languageVarieties}
                      languageVarietyTypes={languageVarietyTypes}
                      preloadedSelects={preloadedSelects}
                      languageNames={languageNames}
                    />
                  )}
                />
                <Route
                  path="/edit/:id"
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
                    />
                  )}
                />
                <Route
                  path="/:title?"
                  render={routeProps => (
                    <DatasetList
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
                    />
                  )}
                />
              </Switch>
            </main>
          </div>
        </div>
        {!showSplash && <Footer />}
      </HashRouter>
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
  languageNames: PropTypes.objectOf(PropTypes.any),
  preloadedSelects: PropTypes.objectOf(PropTypes.any),
  editedId: PropTypes.number,
  groupedDatasets: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string, role: PropTypes.string })
    ),
    name: PropTypes.string
  })
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
  groupedDatasets: {}
};

export default main;
