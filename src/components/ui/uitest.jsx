import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import { FlexibleWidthXYPlot, MarkSeries, XAxis, HorizontalGridLines, YAxis } from 'react-vis';
import { stringify } from 'querystring';

class App extends Component {
  render() {
    const myData = [{ x: 1978, y: 0 }, { x: 1980, y: 0 }, { x: 1982, y: 0 }];

    return (
      <FlexibleWidthXYPlot
        dontCheckIfEmpty={true}
        height={100}
        xDomain={[1970, 1990]}
        yDomain={[0, 1]}
        yType={'category'}
        xType={'linear'}
      >
        <XAxis tickFormat={v => v + ''} />
        <MarkSeries className="mark-series-example" data={myData} />
      </FlexibleWidthXYPlot>
    );
  }
}

export default App;
