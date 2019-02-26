import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Value, Card } from 'grommet-controls';
import { colorFromIndex } from 'grommet-controls/utils';
import { Box, Distribution as GrommetDistribution } from 'grommet';
import PackageAnchor from './PackageAnchor';
import connect from '../../redux/index';

class Distribution extends Component {
  render() {
    const {
      packages, stats, pName, title,
    } = this.props;
    const data = (theme) => {
      const result = [];
      packages.forEach((name, index) => {
        const npm = stats[name];
        if (npm && npm.evaluation) {
          result.push({
            name,
            value: parseInt(npm.evaluation.popularity[pName].toFixed(0), 10),
            color: theme.global.colors[colorFromIndex(index)],
          });
        }
      });
      return result.sort((a, b) => (b.value - a.value));
    };
    return (
      <Card>
        <Box fill='horizontal' basis='324px'>
          <Card.CardTitle>
            {title}
          </Card.CardTitle>
          <Card.CardContent fill={true} flex={true}>
            <ThemeContext.Consumer>
              {theme => (
                <GrommetDistribution
                  basis='medium'
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
                        <PackageAnchor
                          packageName={item.name}
                        >
                          <Value
                            value={item.value}
                            size='large'
                            gap={null}
                            label={item.name}
                          />
                        </PackageAnchor>
                      </Box>
                    </Box>
                    )}
                </GrommetDistribution>
                )}
            </ThemeContext.Consumer>
          </Card.CardContent>
        </Box>
      </Card>
    );
  }
}

Distribution.propTypes = {
  pName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  packages: state.npm.packages,
  stats: state.npm.stats,
});


export default connect(mapStateToProps)(Distribution);

