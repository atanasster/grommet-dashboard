import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Box, Heading, Select } from 'grommet';
import { Card } from 'grommet-controls';
import { LineChart } from 'grommet-controls/chartjs';
import connect from '../../redux/index';
import { npmChangePeriod, npmChangeInterval } from '../../redux/npm/actions';


class NPMTrendsChart extends React.Component {
  onChangeInterval = (interval) => {
    const { packages } = this.props;
    this.props.npmChangeInterval(interval, packages);
  };

  onChangePeriod = (period) => {
    const { packages } = this.props;
    this.props.npmChangePeriod(period, packages);
  };

  render() {
    const {
      packages, intervals, interval, period, title, yAxis, xAxis, basis,
    } = this.props;
    const data = {
      datasets: [],
    };
    if (packages) {
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
    }
    return (
      <Card>
        <Card.CardTitle>
          <Box direction='row' justify='between' align='center' fill='horizontal'>
            <Heading level={4} margin='none'>{title}</Heading>
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
        <Card.CardContent basis={basis}>
          <LineChart
            data={data}
            options={{
              tooltips: {
                mode: 'index',
                intersect: true,
              },
              legend: {
                display: packages && packages.length > 1,
              },
              scales: {
                xAxes: [{
                  display: xAxis,
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
                  display: yAxis,
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
  intervals: state.npm.intervals,
  interval: state.npm.interval,
  period: state.npm.period,

});
NPMTrendsChart.defaultProps = {
  packages: undefined,
  title: 'NPM trends',
  yAxis: true,
  xAxis: true,
  basis: 'medium',
};

NPMTrendsChart.propTypes = {
  packages: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  basis: PropTypes.string,
  yAxis: PropTypes.bool,
  xAxis: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(NPMTrendsChart);

