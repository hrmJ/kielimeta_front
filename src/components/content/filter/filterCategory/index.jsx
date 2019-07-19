import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter } from '../../../../redux/actions/filters';
import BasicButton from '../../../ui/buttons/BasicButton';
import FilterSubCategory from '../filterSubcategory';
import Tooltip from '../../../ui/tooltip';
import styles from './filterCategory.scss';

class filterCategory extends Component {
  state = { submenuOpen: false };

  getSubCategoryValues() {
    const { value, filters, keyName } = this.props;
    if (Array.isArray(filters[keyName])) {
      const subCategoriesRaw = filters[keyName].find(
        cat => cat.replace(/§§.*/, '') === value && cat.includes('§§')
      );
      const subCategories = subCategoriesRaw && subCategoriesRaw.split('§§');
      if (subCategories && subCategories.length > 1) {
        return subCategories.slice(1);
      }
      // const subCategories = value.split('§§');
    }
    return null;
  }

  render() {
    const { filters, value, label, dispatch, keyName } = this.props;
    const { submenuOpen } = this.state;
    const isChecked = filters[keyName] ? filters[keyName].includes(value) : false;
    const subCategories = this.getSubCategoryValues();

    return (
      <li className={styles.categoryListItem}>
        <div className={styles.container}>
          <div className={styles.cbContainer}>
            <div>
              <input
                type="checkbox"
                value={value}
                checked={isChecked}
                onChange={ev =>
                  dispatch(updateAndFilter(keyName, value, ev.target.checked, filters))
                }
              />
            </div>
            <div className={styles.categoryContainer}>
              <div>
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
              </div>
              {submenuOpen && (
                <FilterSubCategory
                  {...{ dispatch, keyName, value, isChecked, filters, subCategories }}
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
  dispatch: PropTypes.func.isRequired
};

export default filterCategory;
