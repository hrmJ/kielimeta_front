import React, { Component } from 'react';
import PropTypes from 'prop-types';

import filterReducer from '../../../../redux/reducers/datasetfilter';
import { updateAndFilter, updateFilter } from '../../../../redux/actions/filters';
import Tooltip from '../../../ui/tooltip';
import styles from './filterSubcategory.scss';
import categoryStyles from '../filterCategory/filterCategory.scss';

class filterSubcategory extends Component {
  categories = [
    {
      label: 'Vain, jos kohdekielen ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria on käännöksen kohdekielen oinaisuus`,
      value: 'TL'
    }
  ];

  checkSubCategory(thisChecked) {
    const { dispatch, isChecked: parentChecked, keyName, value, filters } = this.props;
    let isChecked = parentChecked;
    let updatedFilters = { ...filters };
    if (!(keyName in filters) && thisChecked) {
      dispatch(updateFilter(keyName, value, true));
      updatedFilters = filterReducer(filters, updateFilter(keyName, value, true));
      isChecked = true;
    }
    return dispatch(updateAndFilter(keyName, `${value}§§TL`, isChecked, updatedFilters, value));
  }

  render() {
    const { isChecked: parentChecked, value, subCategories: activeCategories } = this.props;

    return (
      <div className={styles.subMenuContainer}>
        <h5>Lisäehdot</h5>
        <ul className={styles.subCategoryList}>
          {this.categories.map(cat => (
            <li
              key={cat.value}
              className={`${categoryStyles.cbContainer} ${styles.subCategoryListItem}`}
            >
              <input
                type="checkbox"
                value={cat.value}
                checked={parentChecked}
                onChange={ev => this.checkSubCategory(cat.value, ev.target.checked)}
              />
              <Tooltip content={cat.tooltip} direction="right">
                <div>{cat.label}</div>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

filterSubcategory.propTypes = {
  keyName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired,
  subCategories: PropTypes.arrayOf(PropTypes.string)
};

filterSubcategory.defaultProps = {
  subCategories: []
};

export default filterSubcategory;
