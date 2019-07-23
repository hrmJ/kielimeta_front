import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getVarieties } from '../../../../redux/actions/languageactions';
import { updateAndFilter, updateFilter } from '../../../../redux/actions/filters';
import Tooltip from '../../../ui/tooltip';
import categoryStyles from '../filterCategory/filterCategory.scss';
import filterReducer from '../../../../redux/reducers/datasetfilter';
import styles from './filterSubcategory.scss';

class filterSubcategory extends Component {
  categories = [
    {
      label: 'Vain, jos kohdekielen ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria on käännöksen kohdekielen ominaisuus`,
      value: 'TL'
    },
    {
      label: 'Vain, jos lähdekielen ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria on  käännöksen lähdekielen ominaisuus`,
      value: 'SL'
    },
    {
      label: 'Vain, jos L1-puhujien ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria liittyy kieleen, jonka aineisto 
               on (varmuudella) äidinkielisten puhujien tuottamaa`,
      value: 'L1'
    },
    {
      label: 'Vain, jos L2-puhujien ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria liittyy kieleen, jonka aineisto 
               on (varmuudella) muiden kuin äidinkielisten puhujien tuottamaa`,
      value: 'L2'
    },
    {
      label: 'Vain, jos kirjoitetun kielen ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria liittyy kieleen, jonka aineisto 
               sisältää kirjoitettua kieltä`,
      value: 'written'
    },
    {
      label: 'Vain, jos puhutun kielen ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria liittyy kieleen, jonka aineisto 
               sisältää puhuttua kieltä`,
      value: 'spoken'
    },
    {
      label: 'Vain, jos internetkielen ominaisuus',
      tooltip: `Suodattaa näkyviin vain sellaisia aineistoja,
               joissa tämä kategoria liittyy kieleen, jonka aineisto 
               sisältää internetissä käytettyä kieltä`,
      value: 'internet'
    }
  ];

  componentDidMount() {
    const { dispatch, keyName, value, filters, languageVarieties } = this.props;
    if (!(value in languageVarieties)) {
      dispatch(getVarieties(value));
    }
  }

  checkSubCategory(categoryId, thisChecked) {
    const { dispatch, keyName, value, filters } = this.props;
    let isChecked = thisChecked;
    let updatedFilters = { ...filters };

    if (thisChecked) {
      // Make sure that if a subcategory is checked, then the parent category
      // is also checked
      dispatch(updateFilter(keyName, value, true));
      updatedFilters = filterReducer(filters, updateFilter(keyName, value, true));
      isChecked = true;
    }
    let modifiedValue;
    let preparedVal;
    if (updatedFilters[keyName]) {
      preparedVal = updatedFilters[keyName]
        .filter(val => val.replace(/§§.*/g, '') === value)
        .find(val => val.includes('§§'));
    }
    if (isChecked) {
      modifiedValue = `${preparedVal || value}§§${categoryId}`;
    } else {
      modifiedValue = preparedVal ? preparedVal.replace(`§§${categoryId}`, '') : value;
    }
    if (!modifiedValue.includes(value)) {
      modifiedValue = `${value}${modifiedValue}`;
    }
    return dispatch(updateAndFilter(keyName, modifiedValue, isChecked, updatedFilters, value));
  }

  render() {
    const {
      isChecked: parentChecked,
      value,
      subCategories: activeCategories,
      languageVarieties
    } = this.props;

    const nonGenericVariants =
      languageVarieties[value] && languageVarieties[value].filter(val => val.variety !== 'generic');

    return (
      <div className={styles.subMenuContainer}>
        {nonGenericVariants && nonGenericVariants.length > 0 && (
          <div>
            <h5>Kielivariantit</h5>
            <ul className={styles.subCategoryList}>
              {nonGenericVariants.map(variety => (
                <li key={variety.variety} className={styles.subCategoryListItem}>
                  <input
                    type="checkbox"
                    checked={
                      activeCategories
                        ? activeCategories.includes(`VARIETY_${variety.variety}`)
                        : false
                    }
                    onChange={ev =>
                      this.checkSubCategory(`VARIETY_${variety.variety}`, ev.target.checked)
                    }
                  />
                  {variety.variety}
                </li>
              ))}
            </ul>
          </div>
        )}
        <h5>Lisäehdot</h5>
        <ul className={styles.subCategoryList}>
          {this.categories.map(cat => (
            <li key={cat.value} className={styles.subCategoryListItem}>
              <input
                type="checkbox"
                value={cat.value}
                checked={activeCategories ? activeCategories.includes(cat.value) : false}
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
  subCategories: PropTypes.arrayOf(PropTypes.string),
  languageVarieties: PropTypes.objectOf(PropTypes.any)
};

filterSubcategory.defaultProps = {
  subCategories: [],
  languageVarieties: {}
};

export default filterSubcategory;
