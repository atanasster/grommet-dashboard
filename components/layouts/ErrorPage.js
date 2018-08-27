import React from 'react';
import { Box, Heading, Text } from 'grommet';
import CenterLayout from './CenterLayout';
import messages from './messages';

export default ({ statusCode }) => (
  <CenterLayout title='Error'>
    <Box border='right' pad='large'>
      <Heading margin='none'>
        {statusCode || 'What?'}
      </Heading>
    </Box>
    <Box pad='large'>
      <Text>
        {messages[statusCode] || 'Unknown error.'}
      </Text>
    </Box>
  </CenterLayout>
);
