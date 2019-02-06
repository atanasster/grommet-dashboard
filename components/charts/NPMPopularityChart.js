import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'grommet-controls';
import { DoughnutChart } from 'grommet-controls/chartjs';
import connect from '../../redux/index';


class NPMPopularityChart extends React.Component {
  render() {
    const {
      packages, stats, pName, title,
    } = this.props;
    const data = {
      labels: [],
      datasets: [{ data: [] }],
    };

    packages.forEach((name) => {
      const npm = stats[name];
      if (npm && !npm.error && npm.evaluation) {
        data.labels.push(name);
        data.datasets[0].data.push(npm.evaluation.popularity[pName].toFixed(0));
      }
    });
    return (
      <Card background='brand'>
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
  stats: state.npm.stats,
});


export default connect(mapStateToProps)(NPMPopularityChart);

