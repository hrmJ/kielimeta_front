import React from 'react';
import PropTypes from 'prop-types';

import filterReducer from '../../../../redux/reducers/datasetfilter';
import { updateAndFilter, updateFilter } from '../../../../redux/actions/filters';
import Tooltip from '../../../ui/tooltip';
import styles from './filterSubcategory.scss';
import categoryStyles from '../filterCategory/filterCategory.scss';

const filterSubcategory = props => {
  const { dispatch, isChecked: parentChecked, keyName, value, filters } = props;
  return (
    <div className={styles.subMenuContainer}>
      <h5>Lisäehdot</h5>
      <ul className={styles.subCategoryList}>
        <li className={`${categoryStyles.cbContainer} ${styles.subCategoryListItem}`}>
          <input
            type="checkbox"
            value={value}
            checked={parentChecked}
            onChange={ev => {
              let isChecked = parentChecked;
              let updatedFilters = { ...filters };
              if (!(keyName in filters) && ev.target.checked) {
                // filterReducer!
                dispatch(updateFilter(keyName, value, true));
                updatedFilters = filterReducer(filters, updateFilter(keyName, value, true));
                isChecked = true;
              }
              return dispatch(
                updateAndFilter(keyName, `${value}§§TL`, isChecked, updatedFilters, value)
              );
            }}
          />
          <Tooltip
            content={`Suodattaa näkyviin vain sellaisia aineistoja,
                            joissa tämä kategoria on käännöksen kohdekielen
                            ominaisuus`}
            direction="right"
          >
            <div>Vain, jos kohdekielen ominaisuus</div>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

filterSubcategory.propTypes = {
  keyName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired
};

export default filterSubcategory;
