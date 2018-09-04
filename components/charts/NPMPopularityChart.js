import React from 'react';
import PropTypes from 'prop-types';
import { DoughnutChart } from 'grommet-controls';
import { Card } from '../Card/index';
import connect from '../../redux/index';


class NPMPopularityChart extends React.Component {
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
        <Card.CardTitle>
          {title}
        </Card.CardTitle>
        <Card.CardContent basis='medium'>
          <DoughnutChart
            data={data}
            options={{
              themedData: true,
            }}
          />
        </Card.CardContent>
      </Card>
    );
  }
}

NPMPopularityChart.propTypes = {
  pName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default connect(mapStateToProps)(NPMPopularityChart);

