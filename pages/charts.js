import React from 'react';
import { Box, Grid } from 'grommet';
import { ThemeContext } from 'grommet/contexts';
import { colorForName, getRGBA } from 'grommet/utils/colors';
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
    <Box fill='horizontal' basis='300px'>
      <CardTitle>
        {title}
      </CardTitle>
      <CardContent>
        {children}
      </CardContent>
    </Box>
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
                <Bar options={{ height: '100%' }} data={rndDatasets()} />
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
                      { label: 'Filled', fill: true, backgroundColor: getRGBA(colorForName('accent-3', theme), 0.6) },
                    ],
                  })}
                />
              </ChartCard>
              {['circle', 'triangle', 'rect', 'rectRounded', 'rectRot', 'cross', 'crossRot', 'star', 'line', 'dash']
                .map((style, i) => (
                  <ChartCard key={`line_styles_${style}`} title={`Point style : "${style}"`}>
                    <Line
                      data={rndDatasets({
                        count: 1,
                        props: [
                          {
                            pointRadius: 10,
                            pointHoverRadius: 15,
                            showLine: false,
                            backgroundColor: getRGBA(colorForName(colorFromIndex(i), theme), 0.6),
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
              <ChartCard title='Point sizes'>
                <Line
                  data={rndDatasets({
                    count: 3,
                    props: [
                      {
                        label: 'big points',
                        backgroundColor: getRGBA(colorForName('accent-1', theme), 0.6),
                        borderColor: colorForName('accent-1', theme),
                        fill: false,
                        borderDash: [5, 5],
                        pointRadius: 15,
                        pointHoverRadius: 10,
                      },
                      {
                        label: 'individual point sizes',
                        backgroundColor: getRGBA(colorForName('accent-2', theme), 0.6),
                        borderColor: colorForName('accent-2', theme),
                        fill: false,
                        borderDash: [5, 5],
                        pointRadius: [2, 4, 6, 18, 0, 12, 20, 8, 2, 5, 15, 10],
                      },
                      {
                        label: 'large pointHoverRadius',
                        backgroundColor: getRGBA(colorForName('accent-3', theme), 0.6),
                        borderColor: colorForName('accent-3', theme),
                        fill: false,
                        pointHoverRadius: 20,
                      },
                    ],
                  })}
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
                  <Line
                    data={rndDatasets({
                      count: 1,
                      props: [
                        {
                          fill: boundary,
                          backgroundColor: getRGBA(colorForName(colorFromIndex(i), theme), 0.6),
                          borderColor: colorForName(colorFromIndex(i), theme),
                        },
                      ],
                    })}
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
              <ChartCard title='Datasets'>
                <Line
                  data={rndDatasets({
                    count: 3,
                    props: [
                      { label: 'hidden', hidden: true },
                      { label: 'fill "-1"', fill: '-1' },
                      { label: 'fill "1"', fill: '1' },
                    ],
                  })}
                  options={{
                    spanGaps: false,
                    elements: {
                      line: {
                        tension: 0.000001,
                      },
                    },
                    scales: {
                      yAxes: [{
                        stacked: true,
                      }],
                    },
                    plugins: {
                      'filler': {
                        propagate: false,
                      },
                      'samples-filler-analyser': {
                        target: 'chart-analyser',
                      },
                    },
                  }}
                />
              </ChartCard>
            </Grid>
          </Box>
        </React.Fragment>
      )}
    </ThemeContext.Consumer>
  </SiteLayout>
);
