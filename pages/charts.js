import React from 'react';
import { Box, Grid } from 'grommet';
import {
  BarChart, LineChart, HorizontalBarChart, RadarChart, ScatterChart,
  DoughnutChart, PieChart, PolarChart,
} from 'grommet-controls/chartjs';
import { colorFromIndex } from 'grommet-controls/utils';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import ChartCard from '../components/charts/ChartCard';
import { rndRange, rndDatasets, rndDatasets2d, daysAfter, timeFormat, rndTimeSerie, daysAfterStr } from '../components/charts/data';


export default () => (
  <SiteLayout title='Charts'>
    <Box margin={{ bottom: 'large' }}>
      <Title label='Bar charts' />
      <Grid columns='medium' gap='medium'>
        <ChartCard title='Vertical'>
          <BarChart
            data={rndDatasets(2, { borderWidth: 1 })}
          />
        </ChartCard>
        <ChartCard title='Horizontal'>
          <HorizontalBarChart
            data={rndDatasets(1)}
            options={{
              themedData: true,
              legend: { position: 'right' },
              title: {
                display: true,
                text: 'Title of chart',
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Multi axis'>
          <BarChart
            data={rndDatasets(2, [{ yAxisID: 'y-axis-0' }, { yAxisID: 'y-axis-1' }])}
            options={{
              tooltips: {
                mode: 'index',
                intersect: true,
              },
              scales: {
                yAxes: [{
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'y-axis-0',
                }, {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  id: 'y-axis-1',
                  gridLines: {
                    drawOnChartArea: false,
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Stacked'>
          <BarChart
            data={rndDatasets(3)}
            options={{
              tooltips: {
                mode: 'index',
                intersect: true,
              },
              scales: {
                xAxes: [{
                  stacked: true,
                }],
                yAxes: [{
                  stacked: true,
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Stacked group'>
          <BarChart
            data={rndDatasets(3, [{ stack: 'stack-1' }, { stack: 'stack-2' }, { stack: 'stack-1' }])}
            options={{
              tooltips: {
                mode: 'index',
                intersect: true,
              },
              scales: {
                xAxes: [{
                  stacked: true,
                }],
                yAxes: [{
                  stacked: true,
                }],
              },
            }}
          />
        </ChartCard>
      </Grid>
    </Box>
    <Box margin={{ bottom: 'large' }}>
      <Title label='Line charts' />
      <Grid columns='medium' gap='medium'>
        <ChartCard title='Simple'>
          <LineChart
            data={rndDatasets(2, { fill: false })}
            options={{
              title: {
                display: true,
                text: 'Title of chart',
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Multi axis'>
          <LineChart
            data={rndDatasets(2, [
                { yAxisID: 'y-axis-0', fill: false },
                { yAxisID: 'y-axis-1', fill: false },
              ])}
            options={{
              legend: { position: 'right' },
              tooltips: {
                mode: 'index',
                intersect: true,
              },
              scales: {
                yAxes: [{
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'y-axis-0',
                }, {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  id: 'y-axis-1',
                  gridLines: {
                    drawOnChartArea: false,
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Stepped: true'>
          <LineChart data={rndDatasets(1, { steppedLine: true, fill: false })} />
        </ChartCard>
        <ChartCard title='Stepped: "before"'>
          <LineChart data={rndDatasets(1, { steppedLine: 'before', fill: false })} />
        </ChartCard>
        <ChartCard title='Stepped: "after"'>
          <LineChart data={rndDatasets(1, { steppedLine: 'after', fill: false })} />
        </ChartCard>
        <ChartCard title='Line styles'>
          <LineChart
            data={rndDatasets(3, [
                { label: 'Unfilled', fill: false },
                { label: 'Dashed', fill: false, borderDash: [5, 5] },
                {
                 label: 'Filled', fill: true, color: 'accent-4',
                },
              ])}
          />
        </ChartCard>
        {['circle', 'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash']
          .map((style, i) => (
            <ChartCard key={`line_styles_${style}`} title={`Point style : "${style}"`}>
              <LineChart
                data={rndDatasets(1, [
                  {
                    pointRadius: 10,
                    pointHoverRadius: 15,
                    showLine: false,
                    color: colorFromIndex(i),
                  },
                ])}
                options={{
                  legend: {
                    display: false,
                  },
                  elements: {
                    point: {
                      pointStyle: style,
                    },
                  },
                }}
              />
            </ChartCard>
          ))}
        <ChartCard title='Point sizes'>
          <LineChart
            data={rndDatasets(3, [
              {
                label: 'big points',
                color: 'neutral-1',
                fill: false,
                borderDash: [5, 5],
                pointRadius: 15,
                pointHoverRadius: 10,
              },
              {
                label: 'individual point sizes',
                color: 'neutral-2',
                fill: false,
                borderDash: [5, 5],
                pointRadius: [2, 4, 6, 18, 0, 12, 20, 8, 2, 5, 15, 10],
              },
              {
                label: 'large pointHoverRadius',
                color: 'neutral-3',
                fill: false,
                pointHoverRadius: 20,
              },
            ])}
            options={{
              hover: {
                mode: 'index',
              },
            }}
          />
        </ChartCard>
      </Grid>
    </Box>
    <Box margin={{ bottom: 'large' }}>
      <Title label='Area charts' />
      <Grid columns='medium' gap='medium'>
        {[false, 'origin', 'start', 'end'].map((boundary, i) => (
          <ChartCard key={`line_area_fill_${boundary}`} title={`Line fill=${boundary}`}>
            <LineChart
              data={rndDatasets(1, [
                {
                  fill: boundary,
                  color: colorFromIndex(i),
                },
              ])}
              options={{
                spanGaps: false,
                elements: {
                  line: {
                    tension: 0.000001,
                  },
                },
                plugins: {
                  filler: {
                    propagate: false,
                  },
                },
                scales: {
                  xAxes: [{
                    ticks: {
                      autoSkip: false,
                    },
                  }],
                },
              }}
            />
          </ChartCard>
        ))
        }
        <ChartCard title='Stacked'>
          <LineChart
            data={rndDatasets(3, { opacity: 0.9 })}
            options={{
              tooltips: {
                mode: 'index',
              },
              hover: {
                mode: 'index',
              },
              scales: {
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Month',
                  },
                }],
                yAxes: [{
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Value',
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Radar'>
          <RadarChart
            data={rndDatasets(5, [
              { label: 'fill: false ', fill: false },
              { label: 'fill: "-1"', fill: '-1', hidden: true },
              { label: 'fill: 1', fill: 1 },
              { label: 'fill: false', fill: false },
              { label: 'no fill' },

            ], true)}
            options={{
              elements: {
                line: {
                  tension: 0.000001,
                },
              },
              plugins: {
                'filler': {
                  propagate: false,
                },
              },
            }}
          />
        </ChartCard>
      </Grid>
    </Box>
    <Box margin={{ bottom: 'large' }}>
      <Title label='Other charts' />
      <Grid columns='medium' gap='medium'>
        <ChartCard title='Simple scatter'>
          <ScatterChart
            data={rndDatasets2d()}
          />
        </ChartCard>
        <ChartCard title='Multi axis scatter'>
          <ScatterChart
            data={rndDatasets2d(2, [{ yAxisID: 'y-axis-0' }, { yAxisID: 'y-axis-1' }])}
            options={{
              hoverMode: 'nearest',
              intersect: true,
              tooltips: {
                mode: 'index',
                intersect: true,
              },
              scales: {
                xAxes: [{
                  position: 'bottom',
                  gridLines: {
                    zeroLineColor: 'rgba(0,0,0,1)',
                  },
                }],
                yAxes: [{
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'y-axis-0',
                }, {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  reverse: true,
                  id: 'y-axis-1',
                  gridLines: {
                    drawOnChartArea: false,
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Doughnut'>
          <DoughnutChart
            data={rndDatasets(1)}
            options={{
              themedData: true,
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Pie'>
          <PieChart
            data={rndDatasets(1)}
            options={{
              themedData: true,
            }}
          />
        </ChartCard>
        <ChartCard title='Polar area'>
          <PolarChart
            data={rndDatasets(1, { opacity: 0.2 }, true)}
            options={{
              themedData: true,
              legend: {
                position: 'right',
              },
              scale: {
                ticks: {
                  beginAtZero: true,
                },
                reverse: false,
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Radar'>
          <RadarChart
            data={rndDatasets(2, { opacity: 0.2 }, true)}
            options={{
              scale: {
                ticks: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Mixed line + bar'>
          <BarChart
            data={rndDatasets(2, [{ type: 'line', fill: false }, { type: 'bar' }])}
          />
        </ChartCard>
        <ChartCard title='Mixed scatter + line'>
          <LineChart
            data={rndDatasets2d(2, [{ showLine: false, fill: false }, { fill: false }])}
            options={{
              tooltips: {
                mode: 'index',
                intersect: true,
              },
            }}
          />
        </ChartCard>
      </Grid>
    </Box>
    <Box margin={{ bottom: 'large' }}>
      <Title label='Chart scales' />
      <Grid columns='medium' gap='medium'>
        <ChartCard title='Linear scale, step size'>
          <LineChart
            data={rndDatasets(2, { fill: false }, true)}
            options={{
              tooltips: {
                mode: 'index',
                intersect: false,
              },
              hover: {
                mode: 'nearest',
                intersect: true,
              },
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Month',
                  },
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Value',
                  },
                  ticks: {
                    min: 70,
                    max: 110,
                    // forces step size to be 5 units
                    stepSize: 5,
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Linear scale, suggested min/max'>
          <LineChart
            data={rndDatasets(2, { fill: false }, true)}
            options={{
              scales: {
                yAxes: [{
                  ticks: {
                    // the data minimum for determining the ticks is Math.min(dataMin, suggestedMin)
                    suggestedMin: 60,
                    // the data maximum for determining the ticks is Math.max(dataMax, suggestedMax)
                    suggestedMax: 80,
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Logarithmic scale, line chart'>
          <LineChart
            data={rndDatasets(2, { fill: false }, true)}
            options={{
              scales: {
                xAxes: [{
                  display: true,
                }],
                yAxes: [{
                  display: true,
                  type: 'logarithmic',
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Logarithmic scale, scatter chart'>
          <ScatterChart
            data={rndDatasets2d(1)}
            options={{
              scales: {
                xAxes: [{
                  type: 'logarithmic',
                  position: 'bottom',
                  ticks: {
                    userCallback(tick) {
                      const remain = tick / (10 ** Math.floor(Math.log10(tick)));
                      if (remain === 1 || remain === 2 || remain === 5) {
                        return `${tick.toString()} y`;
                      }
                      return '';
                    },
                  },
                  scaleLabel: {
                    labelString: 'x-axis',
                    display: true,
                  },
                }],
                yAxes: [{
                  type: 'linear',
                  ticks: {
                    userCallback(tick) {
                      return `${tick.toString()} units`;
                    },
                  },
                  scaleLabel: {
                    labelString: 'y-axis',
                    display: true,
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Time scale'>
          <LineChart
            data={{
              labels: [ // Date Objects
                daysAfter(0),
                daysAfter(1),
                daysAfter(2),
                daysAfter(3),
                daysAfter(4),
                daysAfter(5),
                daysAfter(6),
              ],
              datasets: [{
                label: 'labels data',
                fill: false,
                data: [
                  rndRange(),
                  rndRange(),
                  rndRange(),
                  rndRange(),
                  rndRange(),
                  rndRange(),
                  rndRange(),
                ],
              }, {
                label: 'point (x,y) data',
                fill: false,
                data: [{
                  x: daysAfterStr(0),
                  y: rndRange(),
                }, {
                  x: daysAfterStr(5),
                  y: rndRange(),
                }, {
                  x: daysAfterStr(7),
                  y: rndRange(),
                }, {
                  x: daysAfterStr(10),
                  y: rndRange(),
                }],
              }],
            }}
            options={{
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    format: timeFormat,
                    // round: 'day'
                    tooltipFormat: 'll HH:mm',
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                  },
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'value',
                  },
                }],
              },
            }}
          />
        </ChartCard>
        <ChartCard title='Time serie'>
          <LineChart
            data={{
              datasets: [{
                label: 'Closing price',
                data: rndTimeSerie(),
                type: 'line',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
                }],
            }}
            options={{
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Price ($)',
                  },
                }],
              },
            }}
          />
        </ChartCard>
      </Grid>
    </Box>
  </SiteLayout>
);
