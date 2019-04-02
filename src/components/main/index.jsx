import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TopBar from '../layout/navigation/topbar.jsx';
import DatasetList from '../content/datasetlist/index.jsx';
import DatasetForm from '../content/datasetform/index.jsx';
import Header from '../layout/header/index.jsx';
import Footer from '../layout/footer/index.jsx';
import styles from '../../general_styles/general_styles.scss';

export default props => {
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
