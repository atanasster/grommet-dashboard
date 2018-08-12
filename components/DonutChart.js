import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { colorForName } from 'grommet/utils/colors';
import { withTheme } from 'grommet/components/hocs';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardTitle, CardContent } from './Card';
import connect from '../redux';
import { colorFromIndex } from '../utils/colors';

class DonutChart extends React.Component {
  render() {
    const {
      packages, pName, theme, title,
    } = this.props;
    const data = {
      labels: [],
      datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
    };
    packages.forEach((npm, index) => {
      data.labels.push(npm.name);
      if (npm.stats) {
        data.datasets[0].data.push(npm.stats.evaluation.popularity[pName].toFixed(0));
        data.datasets[0].backgroundColor.push(colorForName(colorFromIndex(index), theme));
      }
    });
    /* data = {
      labels: [
        'Red',
        'Green',
        'Yellow',
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
    }; */
    return (
      <Box basis='small'>
        <Card>
          <CardTitle>
            {title}
          </CardTitle>
          <CardContent>
            <Doughnut data={data} />
          </CardContent>
        </Card>
      </Box>
    );
  }
}

DonutChart.propTypes = {
  pName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default withTheme(connect(mapStateToProps)(DonutChart));

