import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  filterDatasets,
  resetFilter,
  resetFilterAndRefresh,
  updateFilterVerbose
} from '../../../../redux/actions/filters';
import FilterCategory from '../filterCategory';
import FilterContainer from '../filterContainer';
import ToggleButton from '../../../ui/buttons/toggleButton';
import filterReducer from '../../../../redux/reducers/datasetfilter';
import styles from './arrayfilter.scss';

class ArrayFilter extends Component {
  state = {
    insideOneDataset: true
  };

  componentDidMount() {
    const { allowMulti } = this.props;
    if (!allowMulti) {
      this.setState({ insideOneDataset: false });
    }
  }

  /**
   * toggleInOneDataset
   *
   * sets the switch controlling wether or not all the selected values
   * must be found in a single dataset. Also, run the current filter
   * as the toggled filter type
   *
   * @param idx
   * @returns {undefined}
   */
  toggleInOneDataset(idx) {
    const { dispatch, keyName, filters } = this.props;
    const { insideOneDataset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;
    this.setState({ insideOneDataset: idx === 0 });
    if (filters[actualKeyName]) {
      if (!insideOneDataset * 1 !== idx) {
        let updatedFilters = filterReducer(filters, resetFilter(actualKeyName));
        dispatch(resetFilter(actualKeyName));
        updatedFilters = filterReducer(
          updatedFilters,
          updateFilterVerbose(idx === 0 ? `${keyName}A` : keyName, filters[actualKeyName])
        );
        dispatch(updateFilterVerbose(idx === 0 ? `${keyName}A` : keyName, filters[actualKeyName]));
        dispatch(filterDatasets(updatedFilters));
      }
    }
  }

  /**
   *
   * Resets the filter
   *
   * @param {*} ev the event that triggered the function
   * @memberof Filter
   */
  reset(ev) {
    ev.stopPropagation();
    const { dispatch, keyName, filters } = this.props;
    const { insideOneDataset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;
    dispatch(resetFilterAndRefresh(actualKeyName, filters));
  }

  /**
   * Checks if the filter is in use
   *
   * @returns boolean based on wether or not meaningful filter values found
   * @memberof Filter
   */
  isInUse() {
    const { filters = {}, keyName } = this.props;
    const { insideOneDataset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;
    if (actualKeyName in filters) {
      if (Array.isArray(filters[actualKeyName])) {
        if (filters[actualKeyName].length) {
          return true;
        }
      } else if (filters[actualKeyName]) {
        return true;
      }
    }
    // TODO: other types than arrays

    return false;
  }

  render() {
    const {
      children,
      dispatch,
      keyName,
      filters = {},
      allowMulti,
      hasSubMenu,
      languageVarieties,
      isBoolean
    } = this.props;
    const { insideOneDataset } = this.state;
    const actualKeyName = insideOneDataset ? `${keyName}A` : keyName;

    let { items } = this.props;

    if (!Array.isArray(items)) {
      items = [];
    }

    const andOrSwitch = (
      <ToggleButton
        options={['Samassa aineistossa', 'Koko tietokannassa']}
        customClass={styles.toggleContainer}
        onClick={idx => this.toggleInOneDataset(idx)}
      />
    );

    return (
      <FilterContainer
        label={children}
        filterMenuHeader={allowMulti ? andOrSwitch : null}
        isInUse={this.isInUse()}
        resetFilter={ev => this.reset(ev)}
      >
        <ul className={styles.menuList}>
          {items.map((item, itemIdx) => (
            <FilterCategory
              key={itemIdx.toString()}
              filters={filters}
              dispatch={dispatch}
              keyName={actualKeyName}
              hasSubMenu={hasSubMenu}
              languageVarieties={languageVarieties}
              isBoolean={isBoolean}
              {...item}
            />
          ))}
        </ul>
      </FilterContainer>
    );
  }
}

ArrayFilter.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string
    })
  ),
  keyName: PropTypes.string.isRequired,
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  allowMulti: PropTypes.bool,
  hasSubMenu: PropTypes.bool,
  languageVarieties: PropTypes.objectOf(PropTypes.any),
  isBoolean: PropTypes.bool
};

ArrayFilter.defaultProps = {
  items: [],
  children: null,
  id: '',
  filters: {},
  allowMulti: false,
  hasSubMenu: false,
  languageVarieties: {},
  isBoolean: false
};

export default ArrayFilter;
