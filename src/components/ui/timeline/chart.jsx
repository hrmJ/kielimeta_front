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
    const { years, whiteText } = this.props;
    const { reactVis } = this.state;

    const range = getRange(Math.min(...years), Math.max(...years));
    const style = {};
    if (whiteText) {
      style.text = { fill: '#fff' };
    }

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
            style={style}
          />
          <MarkSeries data={years.map(year => ({ x: year, y: 0 }))} />
        </FlexibleWidthXYPlot>
      );
    }
    return null;
  }
}

TimelineChart.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number),
  whiteText: PropTypes.bool
};

TimelineChart.defaultProps = {
  years: [],
  whiteText: false
};

export default TimelineChart;
