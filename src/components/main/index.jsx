import { HashRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import DatasetForm from '../content/datasetform';
import DatasetList from '../content/datasetlist';
import Footer from '../layout/footer';
import LabelledInput from '../ui/labelledinput';
import Login from '../auth/login';
import TopBar from '../layout/navigation/topbar';
import styles from '../../general_styles/general_styles.scss';

const main = props => {
  const {
    dispatch,
    datasetform,
    loadingState,
    filters,
    originalFilterValues,
    languageVarieties,
    languageVarietyTypes,
    languageNames,
    preloadedSelects
  } = props;
  let { datasets } = props;

  if (!Array.isArray(datasets)) {
    datasets = [];
  }
  // const token = getCookie('jwt_token_access');

  return (
    <HashRouter>
      <div>
        <div className={styles.outerContainer}>
          <TopBar />
          {
            // <Header />
          }
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
                path="/"
                render={() => (
                  <DatasetList
                    datasets={datasets}
                    dispatch={dispatch}
                    filters={filters}
                    originalFilterValues={originalFilterValues}
                  />
                )}
              />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
};

main.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  datasetform: PropTypes.objectOf(PropTypes.any).isRequired,
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired,
  filters: PropTypes.objectOf(PropTypes.any),
  originalFilterValues: PropTypes.objectOf(PropTypes.any),
  languageVarieties: PropTypes.arrayOf(
    PropTypes.shape({ variety: PropTypes.string, variety_type: PropTypes.string })
  ),
  languageVarietyTypes: PropTypes.arrayOf(PropTypes.string),
  languageNames: PropTypes.objectOf(PropTypes.any),
  preloadedSelects: PropTypes.objectOf(PropTypes.any)
};

main.defaultProps = {
  filters: {},
  originalFilterValues: {},
  languageVarieties: [],
  languageVarietyTypes: [],
  languageNames: {},
  preloadedSelects: {}
};

export default main;
