import React from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor } from 'grommet';
import { Github } from 'grommet-icons';
import { Value, Spinning } from 'grommet-controls';
import { colorFromIndex } from 'grommet-controls/utils/colors';
import { Card } from './Card';


class NPMStats extends React.Component {
  render() {
    const { pckg, index } = this.props;
    let content;
    if (pckg.stats) {
      content = (
        <Box justify='between' fill={true} pad='small' flex='grow'>
          <Card.CardTitle>
            <Box direction='row' fill={true} justify='between'>
              <Value size='medium' value={pckg.stats.evaluation.popularity.downloadsCount.toFixed(0)} label='downloads' />
              <Value size='medium' value={pckg.stats.evaluation.popularity.dependentsCount.toFixed(0)} label='dependents' />
              <Value size='medium' value={pckg.stats.evaluation.popularity.communityInterest.toFixed(0)} label='interest' />
            </Box>
          </Card.CardTitle>
          <Card.CardContent align='center' justify='center' >
            <Box direction='row' align='center' pad={{ vertical: 'large' }}>
              <Value size='xlarge' value={pckg.stats.collected.metadata.name} label={pckg.stats.collected.metadata.version} />
            </Box>
          </Card.CardContent>
          <Card.CardActions>
            <Box direction='row' pad={{ top: 'small' }} fill={true} align='center'>
              { pckg.stats.collected.metadata.repository && (
                <Anchor
                  icon={<Github />}
                  href={pckg.stats.collected.metadata.repository.url.split('+')[1]}
                  target='_blank'
                  a11yTitle={`Go to the repository for ${pckg.name}`}
                />
              )}
              { pckg.stats.collected.github && (
              <Box direction='row' align='center' justify='between' fill={true}>
                <Value size='medium' value={pckg.stats.collected.github.starsCount} label='stars' />
                <Value size='medium' value={pckg.stats.collected.github.forksCount} label='forks' />
                <Value size='medium' value={pckg.stats.collected.github.subscribersCount} label='subscribers' />
              </Box>
                )}
            </Box>
          </Card.CardActions>
        </Box>
      );
    } else if (pckg.error) {
      content = (
        <Box fill={true} align='center' direction='row' justify='center' flex='grow'>
          <Value value={pckg.name} label={pckg.error} />
        </Box>
      );
    } else {
      content = (
        <Box fill={true} align='center' direction='row' justify='center' gap='medium' flex='grow'>
          {pckg.name}
          <Spinning />
        </Box>
      );
    }
    return (
      <Card background={colorFromIndex(index)} >
        <Box fill='horizontal' basis='medium'>
          {content}
        </Box>
      </Card>
    );
  }
}

NPMStats.propTypes = {
  pckg: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};


export default NPMStats;
