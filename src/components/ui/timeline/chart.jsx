import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-vis/dist/style.css';
import { getRange } from './index';

class TimelineChart extends Component {
  state = { reactVis: null };

  componentDidMount = async () => {
    const reactVis = await import(/* webpackChunkName: "reactVis"*/ 'react-vis');
    this.setState({ reactVis });
  };

  render() {
    const { years } = this.props;
    const { reactVis } = this.state;

    const range = getRange(Math.min(...years), Math.max(...years));

    if (reactVis && years.length > 0) {
      const { FlexibleWidthXYPlot, MarkSeries, XAxis } = reactVis;

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
    }
    return null;
  }
}

TimelineChart.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number)
};

TimelineChart.defaultProps = {
  years: []
};

export default TimelineChart;
