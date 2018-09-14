import React from 'react';
import { Box } from 'grommet';
import SiteLayout from '../layouts/SiteLayout';
import SideMenu from '../SideMenu/SideMenu';
import Title from '../layouts/Title';

export default ({ title, children, active }) => (
  <SiteLayout title='Tables'>
    <Box direction='row-responsive' gap='medium' flex={false} full='horizontal'>
      <SideMenu
        activeItem={{ id: active }}
        width='small'
        title='Inbox'
        items={[
            {
              id: 'local',
              path: '/tables',
              label: 'Local',
            },
            {
              id: 'graphql',
              path: '/table_graphql',
              label: 'GraphQL',
            },
          ]}
      />
      <Box full='horizontal' flex={true} >
        <Box margin={{ bottom: 'large' }}>
          <Title label={title} />
          {children}
        </Box>
      </Box>
    </Box>
  </SiteLayout>
);

