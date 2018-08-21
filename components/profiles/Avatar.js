import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { ImageStamp } from 'grommet-controls';

const Avatar = ({ image, name, description }) => (
  <Box direction='row' align='center' gap='small'>
    <ImageStamp
      src={image}
      style={{
        width: '36px',
        height: '36px',
        border: '1px solid black',
      }}
      round='full'
    />
    <Box>
      <Text weight='bold' truncate={true}>{name}</Text>
      <Text size='small' truncate={true}>{description}</Text>
    </Box>
  </Box>
);

Avatar.defaultProps = {
  description: undefined,
};

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Avatar;
