import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FilterContainer from '../filterContainer';
import ScaleFilterCategory from '../scaleFilterCategory';

class ScaleFilter extends Component {
  test() {
    this.y = 9;
  }

  render() {
    const { items } = this.props;
    return (
      <FilterContainer label="testi" isInUse={false} resetFilter={() => null}>
        {items.map(item => (
          <ScaleFilterCategory {...item} key={item.label} />
        ))}
      </FilterContainer>
    );
  }
}

ScaleFilter.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ min: PropTypes.number, max: PropTypes.number, label: PropTypes.string })
  )
};

ScaleFilter.defaultProps = {
  items: []
};

export default ScaleFilter;
