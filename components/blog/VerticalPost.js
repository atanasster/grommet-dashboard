import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph, Image } from 'grommet';
import { Favorite } from 'grommet-icons';
import { Card, Avatar, IconButton } from 'grommet-controls';
import RoutedAnchor from '../RoutedAnchor';

const VerticalPost = ({
  image, title, authorName, authorImage, authorDescription, path, excerpt, icons = [],
}) => (
  <Card>
    <RoutedAnchor path={path} style={{ maxWidth: '100%' }}>
      <Box>
        <Box basis='small' flex={false}>
          <Image
            fit='cover'
            src={image}
          />
        </Box>
      </Box>
    </RoutedAnchor>
    <Card.CardContent align='center'>
      <RoutedAnchor path={path}>
        <Heading level={3} margin='none'>
          {title}
        </Heading>
      </RoutedAnchor>
      <Paragraph
        size='small'
        style={{
         display: '-webkit-box',
         WebkitLineClamp: '5',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
       }}
      >
        {excerpt}
      </Paragraph>
      <Box direction='row' justify='between' pad={{ vertical: 'small', horizontal: 'medium' }} fill='horizontal'>
        <Avatar
          image={authorImage}
          title={authorName}
          subTitle={authorDescription}
        />
        {icons.map((icon, idx) => (
          <IconButton key={`title_${idx}`} {...icon} />
        ))}
      </Box>
    </Card.CardContent>
  </Card>
);

VerticalPost.defaultProps = {
  image: undefined,
  authorDescription: undefined,
  path: undefined,
  excerpt: undefined,
  icons: [{ icon: <Favorite /> }],
};
VerticalPost.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorImage: PropTypes.string.isRequired,
  authorDescription: PropTypes.string,
  path: PropTypes.string,
  excerpt: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.object),
};
export default VerticalPost;
