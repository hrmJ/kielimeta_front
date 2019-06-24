import React from 'react';
import PropTypes from 'prop-types';
import 'react-vis/dist/style.css';
import { FlexibleWidthXYPlot, MarkSeries, XAxis } from 'react-vis';
import { getRange } from './index';

const TimelineChart = props => {
  const { years } = props;

  if (years.length === 0) {
    return null;
  }

  const range = getRange(Math.min(...years), Math.max(...years));

  return (
    <FlexibleWidthXYPlot
      dontCheckIfEmpty
      height={100}
      yDomain={[0, 1]}
      xDomain={range}
      yType="category"
      xType="ordinal"
    >
      <XAxis
        tickValues={years}
        tickLabelAngle={-70}
        title={years.length === 2 ? 'Aineistot sijoittuvat annettujen vuosien väliin' : ''}
        position="middle"
      />
      <MarkSeries data={years.map(year => ({ x: year, y: 0 }))} />
    </FlexibleWidthXYPlot>
  );
};

TimelineChart.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number)
};

TimelineChart.defaultProps = {
  years: []
};

export default TimelineChart;
