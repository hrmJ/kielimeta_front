import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { resetFilter, resetFilterAndRefresh } from '../../../../redux/actions/filters';
import FilterContainer from '../filterContainer';
import ScaleFilterCategory from '../scaleFilterCategory';

class ScaleFilter extends Component {
  /**
   *
   * Resets the filter
   *
   * @param {*} ev the event that triggered the function
   * @memberof Filter
   */
  reset(ev) {
    ev.stopPropagation();
    const { items, dispatch, filters } = this.props;
    const itemKeys = [];
    items.forEach(item => {
      dispatch(resetFilter(item.key));
      itemKeys.push(item.key);
    });
    if (items.length) {
      const firstItem = items[0];
      const realFilterKeys = Object.keys(filters).filter(
        thisFilter => !itemKeys.includes(thisFilter)
      );
      const realFilters = {};
      realFilterKeys.forEach(thisKey => {
        realFilters[thisKey] = filters[thisKey];
      });
      dispatch(resetFilterAndRefresh(firstItem.key, realFilters));
    }
  }

  /**
   * Checks if the filter is in use
   *
   * @returns boolean based on wether or not meaningful filter values found
   * @memberof Filter
   */
  isInUse() {
    const { items, filters = {} } = this.props;
    let inUse = false;
    items.forEach(item => {
      if (item.key in filters && Array.isArray(filters[item.key]) && filters[item.key].length) {
        inUse = true;
      }
    });
    return inUse;
  }

  render() {
    const { items, filters, dispatch, label } = this.props;
    const isInUse = this.isInUse();
    return (
      <FilterContainer label={label} resetFilter={ev => this.reset(ev)} isInUse={isInUse}>
        {items.map(item => (
          <ScaleFilterCategory
            {...item}
            key={item.key}
            filterKey={item.key}
            filters={filters}
            dispatch={dispatch}
            reset={!isInUse}
          />
        ))}
      </FilterContainer>
    );
  }
}

ScaleFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array])
  ),
  items: PropTypes.arrayOf(
    PropTypes.shape({ min: PropTypes.number, max: PropTypes.number, label: PropTypes.string })
  ),
  label: PropTypes.string
};

ScaleFilter.defaultProps = {
  items: [],
  filters: {},
  label: ''
};

export default ScaleFilter;
