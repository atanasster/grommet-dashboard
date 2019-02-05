import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { ImageStamp, Card, IconButton } from 'grommet-controls';

export default ({
  avatar, name, description, icons,
}) => (
  <Card>
    <Card.CardContent >
      <Box direction='row' gap='medium' align='center' pad={{ horizontal: 'small' }}>
        <ImageStamp
          src={avatar}
          size='large'
          round='full'
        />
        <Box pad='xsmall'>
          <Heading level={3} margin='none'>
            {name}
          </Heading>
          <Text size='small'>
            {description}
          </Text>
          <Box direction='row' gap='small' pad={{ vertical: 'xsmall' }}>
            {icons.map((icon, idx) => (
              <IconButton
                key={`small_profile_${name}_${idx}`}
                {...icon}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Card.CardContent>
  </Card>
);
