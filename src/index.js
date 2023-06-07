import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';

const DATA_POINT_COUNT = 40;

const randomInt = (min, max) => {
  return parseInt(Math.random() * (max - min + 1) + min);
};

const data = _.times(DATA_POINT_COUNT, () => ({
  name: randomInt(100000, 999999),
  uv: randomInt(1000, 6000),
  pv: randomInt(2000, 7000)
}));

const TiltedAxisTick = (props) => {

    const { x, y, stroke, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="end" 
          fill="#666" 
          transform="rotate(-45)">
            {payload.value}
        </text>
      </g>
    );

};

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      startIndex: 0,
      endIndex: 10,
      interval: 0,
    };
  }

  render() {
    console.log(this.state);

    return <div>
      <BarChart 
        width={600} 
        height={300} 
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>

        <XAxis 
          dataKey="name" 
          tick={<TiltedAxisTick />} 
          interval={this.state.interval} />

        <YAxis width={40} tickFormatter={value => value} />

        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" stackId="a" />
        <Bar dataKey="uv" fill="#82ca9d" stackId="a" />
        
        <Brush 
          dataKey='name' 
          height={20} 
          stroke="#000000" 
          y={260} 
          startIndex={0}
          endIndex={10}>

          <BarChart>
            <Bar dataKey="pv" fill="#8884d8" stackId="a" />
            <Bar dataKey="uv" fill="#82ca9d" stackId="a" />
          </BarChart>

        </Brush>
      </BarChart>
    </div>
  }
};

render(<App />, document.getElementById('root'));
