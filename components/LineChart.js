import React from 'react';
import { bindActionCreators } from 'redux';
import { Box, Heading, Select } from 'grommet';
import { colorForName } from 'grommet/utils/colors';
import { withTheme } from 'grommet/components/hocs';
import { Line } from 'react-chartjs-2';
import { Card, CardTitle, CardContent } from './Card';
import connect from '../redux';
import { npmRetrieveHistory } from '../redux/npm/actions';
import { colorFromIndex } from '../utils/colors';

class LineChart extends React.Component {
  state = {
    interval: 'weekly',
    period: '1 year',
  };

  loadData = (period, interval) => {
    const { packages } = this.props;
    packages.forEach(p => this.props.npmRetrieveHistory(p.name, period, interval));
  };

  componentDidMount() {
    const { interval, period } = this.state;

    this.loadData(period, interval);
  }

  onChangeInterval = (interval) => {
    const { period } = this.state;
    this.setState({ interval });
    this.loadData(period, interval);
  };

  onChangePeriod = (period) => {
    const { interval } = this.state;
    this.setState({ period });
    this.loadData(period, interval);
  };

  render() {
    const { packages, theme } = this.props;
    const { interval, period } = this.state;
    const data = {
      labels: [],
      datasets: [],
    };

    packages.forEach((npm, index) => {
      if (npm[interval]) {
        console.log(npm[interval]);
        console.log(npm.history.downloads);
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
            <Line
              height={324}
              data={data}
              options={{
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      tooltipFormat: 'll',
                    },
                    ticks: {
                      source: 'data',

                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Date',
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
  bindActionCreators({ npmRetrieveHistory }, dispatch);

const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default withTheme(connect(mapStateToProps, mapDispatchToProps)(LineChart));

