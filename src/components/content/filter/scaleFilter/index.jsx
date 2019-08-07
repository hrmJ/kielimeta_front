import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FilterContainer from '../filterContainer';
import ScaleFilterCategory from '../scaleFilterCategory';

class ScaleFilter extends Component {
  test() {
    this.y = 9;
  }

  render() {
    const { items, filters, dispatch } = this.props;
    return (
      <FilterContainer label="testi" isInUse={false} resetFilter={() => null}>
        {items.map(item => (
          <ScaleFilterCategory
            {...item}
            key={item.label}
            filterKey={item.key}
            filters={filters}
            dispatch={dispatch}
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
  )
};

ScaleFilter.defaultProps = {
  items: [],
  filters: {}
};

export default ScaleFilter;
