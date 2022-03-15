import React from 'react';
import Plot from 'react-plotly.js';

 
function DotPlot(props) {
  const { ydata, xdata } = props;

  var trace1 = {
    type: 'scatter',
    x: xdata,
    y: ydata,
    mode: 'markers',
    name: '',
    marker: {
        color: 'rgba(156, 165, 196, 0.95)',
        line: {
            color: 'rgba(156, 165, 196, 1.0)',
            width: 1,
        },
        symbol: 'circle',
        size: 5
    }
};

var data = [trace1];

var layout = {
    title: '',
    xaxis: {
      showgrid: false,
      showline: true,
      linecolor: 'rgb(102, 102, 102)',
      zeroline: false,
      visible: false,
      titlefont: {
        font: {
          color: 'rgb(204, 204, 204)'
        }
      },
      tickfont: {
        font: {
          color: 'rgb(102, 102, 102)'
        }
      },
      autotick: true,
    },
    yaxis: {
        categoryorder: 'max ascending',
        visible: false,
        zeroline: false,
    },
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    },
    legend: {
      font: {
        size: 5,
      },
      yanchor: 'middle',
      xanchor: 'right'
    },
    height: 105,
    hovermode: 'closest',
    mode: 'markers',
    autosize: true
};

const config = {
  displayModeBar: false,
  responsive: true,
  staticPlot: true
};  
    return (
      <Plot
          data={ data }
          layout={ layout }
          config= { config }
          useResizeHandler
          className="w-full"
      />
    );
}

export default DotPlot;