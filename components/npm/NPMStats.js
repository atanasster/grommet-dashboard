import React from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor } from 'grommet';
import { Github } from 'grommet-icons';
import { Value, Spinning, Card } from 'grommet-controls';
import { colorFromIndex } from 'grommet-controls/utils';
import connect from '../../redux/index';
import PackageAnchor from './PackageAnchor';

const NPMStats = ({ name, stats, index }) => {
  let content;
  if (stats) {
    if (stats.error) {
      content = (
        <Box fill={true} align='center' direction='row' justify='center' flex='grow'>
          <Value value={name} label={stats.error} />
        </Box>
      );
    } else {
      content = (
        <Box justify='between' fill={true} pad='small' flex='grow'>
          {stats.evaluation && (
            <Card.CardTitle>
              <Box direction='row' fill={true} justify='between'>
                <Value size='medium' value={stats.evaluation.popularity.downloadsCount.toFixed(0)} label='downloads' />
                <Value size='medium' value={stats.evaluation.popularity.dependentsCount.toFixed(0)} label='dependents' />
                <Value size='medium' value={stats.evaluation.popularity.communityInterest.toFixed(0)} label='interest' />
              </Box>
            </Card.CardTitle>
          )}
          <Card.CardContent align='center' justify='center'>
            <Box direction='row' align='center' pad={{ vertical: 'large' }}>
              <PackageAnchor
                packageName={stats.collected.metadata.name}
              >
                <Value size='xlarge' value={stats.collected.metadata.name} label={stats.collected.metadata.version} />
              </PackageAnchor>
            </Box>
          </Card.CardContent>
          <Card.CardActions>
            <Box direction='row' pad={{ top: 'small' }} fill={true} align='center'>
              {stats.collected.metadata.repository && (
                <Anchor
                  icon={<Github />}
                  href={stats.collected.metadata.repository.url.split('+')[1]}
                  target='_blank'
                  a11yTitle={`Go to the repository for ${name}`}
                />
              )}
              {stats.collected.github && (
                <Box direction='row' align='center' justify='between' fill={true}>
                  <Value size='medium' value={stats.collected.github.starsCount} label='stars' />
                  <Value size='medium' value={stats.collected.github.forksCount} label='forks' />
                  <Value size='medium' value={stats.collected.github.subscribersCount} label='subscribers' />
                </Box>
              )}
            </Box>
          </Card.CardActions>
        </Box>
      );
    }
  } else {
    content = (
      <Box fill={true} align='center' direction='row' justify='center' gap='medium' flex='grow'>
        {name}
        <Spinning />
      </Box>
    );
  }
  return (
    <Card
      background={colorFromIndex(index)}
    >
      <Box fill='horizontal'>
        {content}
      </Box>
    </Card>
  );
};


NPMStats.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  stats: state.npm.stats[props.name],
});


export default connect(mapStateToProps)(NPMStats);
