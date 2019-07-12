import PropTypes from 'prop-types';
import React from 'react';

import Filter from '../filter';
import OrderSelect from '../../ui/orderselect';
import styles from './datasetlist.scss';

const filtersComponent = props => {
  const { filters, originalFilterValues, dispatch, dsLength } = props;
  return (
    <div>
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
          {dsLength}
        </div>
      </section>
    </div>
  );
};

filtersComponent.propTypes = {
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  originalFilterValues: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  dispatch: PropTypes.func.isRequired,
  dsLength: PropTypes.number
};

filtersComponent.defaultProps = {
  originalFilterValues: {},
  filters: {},
  dsLength: 0
};

export default filtersComponent;
