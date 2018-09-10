import React from 'react';
import { bindActionCreators } from 'redux';
import { Box, Heading, Select } from 'grommet';
import { LineChart } from 'grommet-controls';
import { Card } from '../Card/index';
import connect from '../../redux/index';
import { npmChangePeriod, npmChangeInterval } from '../../redux/npm/actions';


class NPMTrendsChart extends React.Component {
  onChangeInterval = (interval) => {
    this.props.npmChangeInterval(interval);
  };

  onChangePeriod = (period) => {
    this.props.npmChangePeriod(period);
  };

  render() {
    const {
      packages, intervals, interval, period,
    } = this.props;
    const data = {
      datasets: [],
    };

    packages.forEach((name) => {
      const npm = intervals[name];
      if (npm && npm[interval]) {
        data.datasets.push({
          label: name,
          data: npm[interval].map(d => ({ x: d.day, y: d.downloads })),
          fill: false,
        });
      }
    });
    return (
      <Card>
        <Card.CardTitle>
          <Box direction='row' justify='between' align='center' fill='horizontal'>
            <Heading level={4} margin='none'>NPM trends</Heading>
            <Box direction='row' gap='small'>
              <Select
                value={period}
                options={['1 month', '3 months', '6 months', '1 year', '2 years']}
                onChange={({ value }) => this.onChangePeriod(value)}
              />
              <Select
                value={interval}
                options={['daily', 'weekly', 'monthly', 'yearly']}
                onChange={({ value }) => this.onChangeInterval(value)}
              />
            </Box>
          </Box>
        </Card.CardTitle>
        <Card.CardContent basis='medium'>
          <LineChart
            data={data}
            options={{
              tooltips: {
                mode: 'index',
                intersect: true,
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    tooltipFormat: 'llll',
                    unit: 'day',
                    displayFormats: {
                      'day': 'll',
                    },
                  },
                  ticks: {
                    source: 'data',
                    autoSkip: interval === 'daily' ? true : undefined,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'date',
                  },
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'downloads',
                  },
                }],
              },
            }}
          />
        </Card.CardContent>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ npmChangePeriod, npmChangeInterval }, dispatch);

const mapStateToProps = state => ({
  packages: state.npm.packages,
  intervals: state.npm.intervals,
  interval: state.npm.interval,
  period: state.npm.period,

});


export default connect(mapStateToProps, mapDispatchToProps)(NPMTrendsChart);

