import React from 'react';
import { Box, Heading, Text } from 'grommet';
import Page from './Page';

export default ({ statusCode, message }) => (
  <Page title='Error'>
    <Box align='center' full={true} flex={true}>
      <Box direction='row' align='center' full='vertical' flex={true}>
        <Box border='right' pad='large'>
          <Heading margin='none'>
            {statusCode}
          </Heading>
        </Box>
        <Box pad='large'>
          <Text>
            {message}
          </Text>
        </Box>
      </Box>
    </Box>
  </Page>
);
