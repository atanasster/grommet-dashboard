import React from 'react';
import { bindActionCreators } from 'redux';
import { Box, Heading, Select } from 'grommet';
import { colorForName } from 'grommet/utils/colors';
import { withTheme } from 'grommet/components/hocs';
import { Line } from 'react-chartjs-2';
import { Card, CardTitle, CardContent } from '../Card/index';
import connect from '../../redux/index';
import { npmChangePeriod, npmChangeInterval } from '../../redux/npm/actions';
import { colorFromIndex } from '../../utils/colors';
import withChartTheme from './ThemedChart';

const ThemedLine = withChartTheme(Line);

class LineChart extends React.Component {
  onChangeInterval = (interval) => {
    this.props.npmChangeInterval(interval);
  };

  onChangePeriod = (period) => {
    this.props.npmChangePeriod(period);
  };

  render() {
    const {
      packages, theme, interval, period,
    } = this.props;
    const data = {
      datasets: [],
    };

    packages.forEach((npm, index) => {
      if (npm[interval]) {
        data.datasets.push({
          label: npm.name,
          data: npm[interval].map(d => ({ x: d.day, y: d.downloads })),
          backgroundColor: 'transparent',
          borderColor: colorForName(colorFromIndex(index), theme),
        });
      }
    });
    return (
      <Card>
        <Box fill='horizontal'>
          <CardTitle>
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
          </CardTitle>
          <CardContent>
            <ThemedLine
              height={324}
              data={data}
              options={{
              maintainAspectRatio: false,
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
          </CardContent>
        </Box>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ npmChangePeriod, npmChangeInterval }, dispatch);

const mapStateToProps = state => ({
  packages: state.npm.packages,
  interval: state.npm.interval,
  period: state.npm.period,

});


export default withTheme(connect(mapStateToProps, mapDispatchToProps)(LineChart));

