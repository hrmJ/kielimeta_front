import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopBar from '../layout/navigation/topbar';
import DatasetList from '../content/datasetlist';
import DatasetForm from '../content/datasetform';
import Header from '../layout/header';
import Footer from '../layout/footer';
import styles from '../../general_styles/general_styles.scss';

const main = (props) => {
  const { datasets, dispatch } = props;

  return (
    <BrowserRouter>
      <div className={styles.outerContainer}>
        <TopBar />
        <Header />
        <main>
          <Switch>
            <Route path="/newdataset" render={() => <DatasetForm />} />
            <Route
              path="/"
              render={() => <DatasetList datasets={datasets} dispatch={dispatch} />}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

main.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default main;
