import React from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor } from 'grommet';
import { Github } from 'grommet-icons';
import { Value, Spinning } from 'grommet-controls';
import { Card, CardTitle, CardActions, CardContent } from './Card';
import { colorFromIndex } from '../utils/colors';

class NPMStats extends React.Component {
  render() {
    const { pckg, index } = this.props;
    const content = (
      <Box justify='between' fill={true} >
        <CardTitle>
          {pckg.stats ? (
            <Box direction='row' fill={true} justify='between'>
              <Value
                size='medium'
                value={pckg.stats.evaluation.popularity.downloadsCount.toFixed(0)}
                label='downloads'
              />
              <Value
                size='medium'
                value={pckg.stats.evaluation.popularity.dependentsCount.toFixed(0)}
                label='dependents'
              />
              <Value
                size='medium'
                value={pckg.stats.evaluation.popularity.communityInterest.toFixed(0)}
                label='interest'
              />
            </Box>
            ) : pckg.name
            }
        </CardTitle>
        <CardContent>
          <Box align='center' justify='center' basis='small' >
            <Box direction='row' align='center' pad={{ vertical: 'large' }}>
              <Value size='xlarge' value={pckg.name} label={pckg.stats ? pckg.stats.collected.metadata.version : ''} />
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          { pckg.stats ? (
            <Box direction='row' fill={true} align='center'>
              <Anchor
                icon={<Github />}
                href={pckg.stats.collected.metadata.repository.url.split('+')[1]}
                target='_blank'
                a11yTitle={`Go to the repository for ${pckg.name}`}
              />
              { pckg.stats.collected.github && (
              <Box direction='row' align='center' justify='between' fill={true}>
                <Value size='medium' value={pckg.stats.collected.github.starsCount} label='stars' />
                <Value size='medium' value={pckg.stats.collected.github.forksCount} label='forks' />
                <Value size='medium' value={pckg.stats.collected.github.subscribersCount} label='subscribers' />
              </Box>
                )}
            </Box>
            ) : <Value size='medium' value={<Spinning />} label='loading' />
          }
        </CardActions>
      </Box>
    );
    return (
      <Card background={colorFromIndex(index)} fill='horizontal' flex={true}>
        {content}
      </Card>
    );
  }
}

NPMStats.propTypes = {
  pckg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};


export default NPMStats;
