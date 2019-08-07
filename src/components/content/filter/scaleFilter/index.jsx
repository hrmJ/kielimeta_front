import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FilterContainer from '../filterContainer';

class ScaleFilter extends Component {
  render() {
    return (
      <FilterContainer label="testi" isInUse={false} resetFilter={() => null}>
        moro
      </FilterContainer>
    );
  }
}

ScaleFilter.propTypes = {};

export default ScaleFilter;
