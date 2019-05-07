import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import { FlexibleWidthXYPlot, XYPlot, MarkSeries, XAxis, LabelSeries } from 'react-vis';
import { getRange } from './index';

export default props => {
  const { years = [] } = props;

  if (years.length == 0) {
    return null;
  }

  const range = getRange(Math.min(...years), Math.max(...years));
  return (
    <FlexibleWidthXYPlot
      dontCheckIfEmpty={true}
      height={100}
      yDomain={[0, 1]}
      xDomain={range}
      yType={'category'}
      xType={'ordinal'}
      getY={() => 0}
      getX={val => val}
    >
      <XAxis
        tickValues={years}
        tickLabelAngle={-70}
        title={years.length == 2 ? 'Aineistot sijoittuvat annettujen vuosien väliin' : ''}
        position="middle"
      />
      <MarkSeries data={years} />
    </FlexibleWidthXYPlot>
  );
};
