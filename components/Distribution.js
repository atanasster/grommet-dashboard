import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'grommet/components/hocs';
import { colorForName } from 'grommet/utils/colors';
import { Value } from 'grommet-controls';
import { Box, Distribution } from 'grommet';
import { Card, CardTitle, CardContent } from './Card';
import connect from '../redux';
import { colorFromIndex } from '../utils/colors';


class DistributionCard extends Component {
  render() {
    const {
      packages, pName, theme, title,
    } = this.props;
    const data = [];
    packages.forEach((npm, index) => {
      if (npm.stats) {
        data.push({
          name: npm.name,
          value: parseInt(npm.stats.evaluation.popularity[pName].toFixed(0), 10),
          color: colorForName(colorFromIndex(index), theme),
        });
      }
    });
    console.log(data);
    return (
      <Card>
        <Box fill='horizontal' basis='324px'>
          <CardTitle>
            {title}
          </CardTitle>
          <CardContent fill={true} flex={true}>

            <Distribution values={data} style={{ height: '100%' }}>
              {item => (
                <Box
                  background={item.color}
                  border='all'
                  fill={true}
                  align='center'
                >
                  <Box direction='row' align='center' fill='vertical'>
                    <Value
                      value={item.value}
                      label={item.name}
                    />
                  </Box>
                </Box>
                )}
            </Distribution>
          </CardContent>
        </Box>
      </Card>
    );
  }
}

DistributionCard.propTypes = {
  pName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default withTheme(connect(mapStateToProps)(DistributionCard));

