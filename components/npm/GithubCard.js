import React from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor, Paragraph, Text } from 'grommet';
import { Github } from 'grommet-icons';
import { Value } from 'grommet-controls';
import { Card } from '../Card/index';

const GitHubCard = ({ collected, ...rest }) => {
  let content;
  if (collected && collected.github) {
    content = (
      <React.Fragment>
        <Card.CardTitle>
          <Box direction='row' fill={true} justify='between'>
            <Value size='medium' value={collected.github.issues.count.toFixed(0)} label='total issues' />
            <Value size='medium' value={collected.github.issues.openCount.toFixed(0)} label='open issues' />
          </Box>
        </Card.CardTitle>
        <Card.CardContent align='center' gap='small' pad='medium'>
          <Anchor
            icon={<Github />}
            label={collected.github.homepage}
            href={collected.github.homepage}
            target='_blank'
            a11yTitle='Go to github repository'
          />
          {collected.metadata.publisher && (
            <Text>{`${collected.metadata.publisher.username} (${collected.metadata.publisher.email}) `}</Text>
          )}
          <Paragraph textAlign='center' size='small'>
            {collected.metadata.description}
          </Paragraph>
        </Card.CardContent>
        <Card.CardActions>
          <Box direction='row' align='center' justify='between' fill={true}>
            <Value size='medium' value={collected.github.starsCount} label='stars' />
            <Value size='medium' value={collected.forksCount} label='forks' />
            <Value size='medium' value={collected.github.subscribersCount} label='subscribers' />
          </Box>
        </Card.CardActions>
      </React.Fragment>
    );
  }
  return (
    <Card
      background='white'
      {...rest}
    >
      {content}
    </Card>
  );
};

GitHubCard.defaultProps = {
  github: undefined,
};


GitHubCard.propTypes = {
  github: PropTypes.object,
};


export default GitHubCard;
