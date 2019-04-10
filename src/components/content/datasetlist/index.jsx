import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listAll, filterByQuery } from '../../../redux/actions/datasets';
import Filter from '../filter';
import DatasetItem from '../datasetitem';
import styles from './datasetlist.scss';
import { printLanguageName } from '../languagebadge';

export default class DatasetList extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      datasets: PropTypes.arrayOf(PropTypes.object).isRequired
    };
  }

  componentDidMount() {
    const { dispatch, isTest } = this.props;
    if (!isTest) {
      dispatch(listAll());
    }
  }

  filterDatasets(query) {
    const { dispatch, filters } = this.props;
    dispatch(filterByQuery({ ...filters, query: query }));
  }

  render() {
    const { datasets, dispatch, filters, originalFilterValues } = this.props;

    return (
      <div id="resources" className={styles.datasetlistContainer}>
        <section className={styles.searchBarContainer}>
          <input
            id="searchfield"
            type="text"
            onChange={ev => this.filterDatasets(ev.target.value)}
            placeholder="Hae nimellä, x:llä..."
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
        <ul>
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
