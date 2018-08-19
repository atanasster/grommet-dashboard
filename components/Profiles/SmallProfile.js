import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import { Card, CardContent } from '../Card';
import IconButton from '../IconButton/IconButton';

export default ({
  avatar, name, description, icons,
}) => (
  <Card>
    <CardContent >
      <Box direction='row' gap='medium' align='center'>
        <ImageStamp
          src={avatar} size='large'
          round='full'
        />
        <Box pad='small'>
          <Heading level={3} margin='none'>
            {name}
          </Heading>
          <Text size='small'>
            {description}
          </Text>
          <Box direction='row' gap='small'>
            {icons.map((icon, idx) => (
              <IconButton
                key={`small_profile_${name}_${idx}`}
                {...icon}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);
