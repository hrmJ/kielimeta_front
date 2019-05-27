import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { listAll, filterByQuery } from '../../../redux/actions/datasets';
import { printLanguageName } from '../languagebadge';
import DatasetItem from '../datasetitem';
import DelayedSearchField from '../../ui/DelayedSearchField';
import Filter from '../filter';
import OrderSelect from '../../ui/orderselect';
import styles from './datasetlist.scss';

export default class DatasetList extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
  }

  componentDidMount() {
    const { dispatch, isTest } = this.props;
    if (!isTest) {
      dispatch(listAll());
    }
  }

  filterDatasets(query) {
    console.debug(query);
    const { dispatch, filters } = this.props;
    dispatch(filterByQuery({ ...filters, query }));
  }

  render() {
    const {
      datasets, dispatch, filters, originalFilterValues,
    } = this.props;

    return (
      <div id="resources" className={styles.datasetlistContainer}>
        <section className={styles.searchBarContainer}>
          <DelayedSearchField
            id="searchfield"
            onChange={this.filterDatasets.bind(this)}
            placeholder="Hae nimellä tai avainsanalla"
          />
        </section>
        <section className={styles.filterContainer}>
          <Filter
            filters={filters}
            id="langfilter"
            keyName="lang"
            items={originalFilterValues.lang}
            dispatch={dispatch}
          >
            Kielet
          </Filter>
          <Filter
            filters={filters}
            id="typefilter"
            keyName="resourcetype"
            items={originalFilterValues.resourcetype}
            dispatch={dispatch}
          >
            Aineistotyypit
          </Filter>
          <Filter>Koko</Filter>
          <Filter>Lisää suodattimia </Filter>
        </section>
        <section className={styles.resultNumberContainer}>
          <div>
            Aineistoja näillä suodattimilla:
            {datasets.length}
          </div>
          <div>
            <OrderSelect items={['nimi', 'koko']} />
          </div>
        </section>
        <ul className={styles.datasetList}>
          {datasets.map(dataset => (
            <li key={dataset.id} className={styles.datasetitemContainer}>
              <DatasetItem {...dataset} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
