import React from 'react';
import { Box } from 'grommet';
import Page from './SiteLayout';

export default ({ children, ...rest }) => (
  <Page {...rest}>
    <Box justify='center' full={true} flex={true}>
      <Box direction='row' justify='center'>
        {children}
      </Box>
    </Box>
  </Page>
);
