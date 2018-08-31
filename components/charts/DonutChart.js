import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { colorForName } from 'grommet/utils/colors';
import { ThemeContext } from 'grommet/contexts';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardTitle, CardContent } from '../Card/index';
import connect from '../../redux/index';
import { colorFromIndex } from '../../utils/colors';
import withChartTheme from './ThemedChart';

const ThemedDoughnut = withChartTheme(Doughnut);

class DonutChart extends React.Component {
  render() {
    const {
      packages, pName, title,
    } = this.props;
    const data = (theme) => {
      const result = {
        labels: [],
        datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
      };

      packages.forEach((npm, index) => {
        if (npm.stats) {
          result.labels.push(npm.name);
          result.datasets[0].data.push(npm.stats.evaluation.popularity[pName].toFixed(0));
          result.datasets[0].backgroundColor.push(colorForName(colorFromIndex(index), theme));
        }
      });
      return result;
    };
    return (
      <Card>
        <Box fill='horizontal' basis='324px'>
          <CardTitle>
            {title}
          </CardTitle>
          <CardContent>
            <ThemeContext.Consumer>
              {theme => (
                <ThemedDoughnut
                  data={data(theme)}
                  height={324}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
                )}
            </ThemeContext.Consumer>
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

