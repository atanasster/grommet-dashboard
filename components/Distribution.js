import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'grommet/contexts';
import { colorForName } from 'grommet/utils/colors';
import { Value } from 'grommet-controls';
import { colorFromIndex } from 'grommet-controls/utils/colors';
import { Box, Distribution } from 'grommet';
import { Card, CardTitle, CardContent } from './Card';
import connect from '../redux';

class DistributionCard extends Component {
  render() {
    const {
      packages, pName, title,
    } = this.props;
    const data = (theme) => {
      const result = [];
      packages.forEach((npm, index) => {
        if (npm.stats) {
          result.push({
            name: npm.name,
            value: parseInt(npm.stats.evaluation.popularity[pName].toFixed(0), 10),
            color: colorForName(colorFromIndex(index), theme),
          });
        }
      });
      return result.sort((a, b) => (b.value - a.value));
    };
    return (
      <Card>
        <Box fill='horizontal' basis='324px'>
          <CardTitle>
            {title}
          </CardTitle>
          <CardContent fill={true} flex={true}>
            <ThemeContext.Consumer>
              {theme => (
                <Distribution
                  values={data(theme)}
                  style={{ height: '100%' }}
                >
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
                          size='large'
                          gap={null}
                          label={item.name}
                        />
                      </Box>
                    </Box>
                    )}
                </Distribution>
                )}
            </ThemeContext.Consumer>
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


export default connect(mapStateToProps)(DistributionCard);

