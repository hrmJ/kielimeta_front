import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { updateAndFilter } from '../../../../redux/actions/filters';
import BasicButton from '../../../ui/buttons/BasicButton';
import FilterSubCategory from '../filterSubcategory';
import Tooltip from '../../../ui/tooltip';
import styles from './filterCategory.scss';

class filterCategory extends Component {
  state = { submenuOpen: false };

  render() {
    const { filters, value, label, dispatch, keyName } = this.props;
    const { submenuOpen } = this.state;
    const isChecked = filters[keyName] ? filters[keyName].includes(value) : false;

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
                <FilterSubCategory {...{ dispatch, keyName, value, isChecked, filters }} />
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
