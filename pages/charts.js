import React from 'react';
import { Box, Grid } from 'grommet';
import { ThemeContext } from 'grommet/contexts';
import { colorForName } from 'grommet/utils/colors';
import { colorFromIndex } from '../utils/colors';
import { Card, CardTitle, CardContent } from '../components/Card';
import { Bar } from '../components/charts/chartjs/Bar';
import { Line } from '../components/charts/chartjs/Line';
import { HorizontalBar } from '../components/charts/chartjs/HorizontalBar';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import { rndDatasets } from '../components/charts/data';


const ChartCard = ({ title, children }) => (
  <Card>
    <CardTitle>
      {title}
    </CardTitle>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);


export default () => (
  <SiteLayout title='Charts'>
    <Title label='Charts' />
    <ThemeContext.Consumer>
      {theme => (
        <React.Fragment>
          <Box margin={{ bottom: 'large' }}>
            <Title label='Bar charts' />
            <Grid columns='medium' gap='medium'>
              <ChartCard title='Vertical'>
                <Bar data={rndDatasets()} />
              </ChartCard>
              <ChartCard title='Horizontal'>
                <HorizontalBar
                  data={rndDatasets({ count: 1 })}
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
                <Bar
                  data={rndDatasets({ props: [{ yAxisID: 'y-axis-0' }, { yAxisID: 'y-axis-1' }] })}
                  options={{
                    tooltips: {
                      mode: 'index',
                      intersect: true,
                    },
                    scales: {
                      yAxes: [{
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: 'left',
                        id: 'y-axis-0',
                      }, {
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
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
                <Bar
                  data={rndDatasets({ count: 3 })}
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
                <Bar
                  data={rndDatasets({ count: 3, props: [{ stack: 'stack-1' }, { stack: 'stack-2' }, { stack: 'stack-1' }] })}
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
                <Line
                  data={rndDatasets()}
                  options={{
                    title: {
                      display: true,
                      text: 'Title of chart',
                    },
                  }}
                />
              </ChartCard>
              <ChartCard title='Multi axis'>
                <Line
                  data={rndDatasets({ props: [{ yAxisID: 'y-axis-0' }, { yAxisID: 'y-axis-1' }] })}
                  options={{
                    legend: { position: 'right' },
                    tooltips: {
                      mode: 'index',
                      intersect: true,
                    },
                    scales: {
                      yAxes: [{
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: 'left',
                        id: 'y-axis-0',
                      }, {
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
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
                <Line data={rndDatasets({ count: 1, props: { steppedLine: true } })} />
              </ChartCard>
              <ChartCard title='Stepped: "before"'>
                <Line data={rndDatasets({ count: 1, props: { steppedLine: 'before' } })} />
              </ChartCard>
              <ChartCard title='Stepped: "after"'>
                <Line data={rndDatasets({ count: 1, props: { steppedLine: 'after' } })} />
              </ChartCard>
              <ChartCard title='Line styles'>
                <Line
                  data={rndDatasets({
                    count: 3,
                    props: [
                      { label: 'Unfilled', fill: false },
                      { label: 'Dashed', fill: false, borderDash: [5, 5] },
                      { label: 'Filled', fill: true, backgroundColor: colorForName('accent-3', theme) },
                    ],
                  })}
                />
              </ChartCard>
              {['circle', 'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash']
                .map((style, i) => (
                  <ChartCard title={`Point style : "${style}"`}>
                    <Line
                      data={rndDatasets({
                        count: 1,
                        props: [
                          {
                            pointRadius: 10,
                            pointHoverRadius: 15,
                            showLine: false,
                            backgroundColor: colorForName(colorFromIndex(i), theme),
                            borderColor: colorForName(colorFromIndex(i), theme),
                          },
                        ],
                      })}
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
            </Grid>
          </Box>
        </React.Fragment>
      )}
    </ThemeContext.Consumer>
  </SiteLayout>
);
