import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Doughnut } from './chartjs/Doughnut';
import { Card, CardTitle, CardContent } from '../Card/index';
import connect from '../../redux/index';


class DonutChart extends React.Component {
  render() {
    const {
      packages, pName, title,
    } = this.props;
    const data = {
      labels: [],
      datasets: [{ data: [] }],
    };

    packages.forEach((npm) => {
      if (npm.stats) {
        data.labels.push(npm.name);
        data.datasets[0].data.push(npm.stats.evaluation.popularity[pName].toFixed(0));
      }
    });
    return (
      <Card>
        <Box fill='horizontal' basis='324px'>
          <CardTitle>
            {title}
          </CardTitle>
          <CardContent>
            <Doughnut
              data={data}
              height={324}
              options={{
                maintainAspectRatio: false,
                themedData: true,
              }}
            />
          </CardContent>
        </Box>
      </Card>
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


export default connect(mapStateToProps)(DonutChart);

