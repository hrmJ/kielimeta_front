import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter } from '../../../../redux/actions/filters';
import BasicButton from '../../../ui/buttons/BasicButton';
import FilterSubCategory from '../filterSubcategory';
import Icon from '../../../ui/icon';
import Tooltip from '../../../ui/tooltip';
import styles from './filterCategory.scss';

class filterCategory extends Component {
  state = { submenuOpen: false };

  getSubCategoryValues() {
    const { value, filters, keyName } = this.props;
    if (Array.isArray(filters[keyName]) && filters[keyName].length > 0) {
      const subCategoriesRaw = filters[keyName].find(
        cat => cat && cat.replace(/§§.*/, '') === value && cat.includes('§§')
      );
      const subCategories = subCategoriesRaw && subCategoriesRaw.split('§§');
      if (subCategories && subCategories.length > 1) {
        return subCategories.slice(1);
      }
      // const subCategories = value.split('§§');
    }
    return null;
  }

  toggle(isChecked) {
    const { dispatch, keyName, value, filters } = this.props;
    dispatch(updateAndFilter(keyName, value, isChecked, filters));
  }

  render() {
    const { filters, value, label, dispatch, keyName, hasSubMenu, languageVarieties } = this.props;
    const { submenuOpen } = this.state;
    const subCategories = this.getSubCategoryValues();
    const isChecked = filters[keyName]
      ? filters[keyName].includes(value) || subCategories !== null
      : false;

    return (
      <li className={styles.categoryListItem}>
        <div className={styles.container}>
          <div className={styles.cbContainer}>
            <div>
              <input
                type="checkbox"
                value={value}
                checked={isChecked !== null ? isChecked : false}
                onChange={ev => this.toggle(ev.target.checked)}
              />
            </div>
            <div className={styles.categoryContainer}>
              <div>
                <div className={styles.catLabelContainer}>
                  {hasSubMenu ? (
                    <Tooltip
                      content={`${
                        !submenuOpen ? 'Määrittele lisäehtoja' : 'Sulje lisäehdot'
                      } klikkaamalla kategorian nimeä`}
                      direction="right"
                    >
                      <BasicButton
                        text={label}
                        noBackground
                        onClick={() => this.setState({ submenuOpen: !submenuOpen })}
                      />
                    </Tooltip>
                  ) : (
                    <div>{label} </div>
                  )}
                  {subCategories && (
                    <div className={styles.hasSubCat}>
                      <Tooltip content="Olet määritellyt lisäehtoja" direction="right">
                        <Icon iconName="faExclamationCircle" />
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
              {submenuOpen && hasSubMenu && (
                <FilterSubCategory
                  {...{
                    dispatch,
                    keyName,
                    value,
                    isChecked,
                    filters,
                    subCategories,
                    languageVarieties
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

filterCategory.propTypes = {
  keyName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  hasSubMenu: PropTypes.bool,
  languageVarieties: PropTypes.objectOf(PropTypes.any)
};

filterCategory.defaultProps = {
  hasSubMenu: false,
  languageVarieties: {}
};

export default filterCategory;
