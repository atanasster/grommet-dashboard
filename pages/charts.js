import React from 'react';
import { Box, Grid } from 'grommet';
import { colorFromIndex } from '../utils/colors';
import { Card, CardTitle, CardContent } from '../components/Card';
import { BarChart } from '../components/charts/chartjs/BarChart';
import { LineChart } from '../components/charts/chartjs/LineChart';
import { HorizontalBarChart } from '../components/charts/chartjs/HorizontalBarChart';
import { RadarChart } from '../components/charts/chartjs/RadarChart';
import { ScatterChart } from '../components/charts/chartjs/ScatterChart';
import { DoughnutChart } from '../components/charts/chartjs/DoughnutChart';
import { PieChart } from '../components/charts/chartjs/PieChart';
import { PolarChart } from '../components/charts/chartjs/PolarChart';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import { rndDatasets, rndDatasets2d } from '../components/charts/data';


const ChartCard = ({ title, children }) => (
  <Card>
    <CardTitle>
      {title}
    </CardTitle>
    <CardContent basis='medium'>
      {children}
    </CardContent>
  </Card>
);


export default () => (
  <SiteLayout title='Charts'>
    <Title label='Charts' />
    <Box margin={{ bottom: 'large' }}>
      <Title label='Bar charts' />
      <Grid columns='medium' gap='medium'>
        <ChartCard title='Vertical'>
          <BarChart
            data={rndDatasets()}
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
            data={rndDatasets(1, {}, true)}
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
      </Grid>
    </Box>
  </SiteLayout>
);
