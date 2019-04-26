import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopBar from '../layout/navigation/topbar';
import DatasetList from '../content/datasetlist';
import DatasetForm from '../content/datasetform';
import Login from '../auth/login';
// import Header from '../layout/header';
import Footer from '../layout/footer';
import styles from '../../general_styles/general_styles.scss';
import { getCookie } from '../../utils';

const main = props => {
  const { dispatch, datasetform, loadingState, filters, originalFilterValues } = props;
  let { datasets } = props;
  if (!Array.isArray(datasets)) {
    console.log(datasets);
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
              <Route path="/login" render={() => <Login />} />
              <Route
                path="/newdataset"
                render={() => (
                  <DatasetForm
                    fields={datasetform}
                    loadingState={loadingState}
                    dispatch={dispatch}
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
  loadingState: PropTypes.objectOf(PropTypes.any).isRequired
};

export default main;
