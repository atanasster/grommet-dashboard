import React from 'react';
import { Box } from 'grommet';
import {
  Grommet as GrommetIcon, Home, TextAlignCenter,
  Document, Cubes,
} from 'grommet-icons';

import { Sidebar } from '../components/Sidebar/SideBar';
import SiteLayout from '../components/layouts/SiteLayout';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <SiteLayout title='Profile'>
        <Sidebar
          title='Inbox'
          items={[
      { path: '/', label: 'home', icon: <Home size='xsmall' /> },
      { path: '/typography', label: 'typography', icon: <TextAlignCenter size='xsmall' /> },
      { path: '/icons', label: 'icons', icon: <GrommetIcon size='xsmall' /> },
      {
        label: 'interface',
        icon: <Cubes size='xsmall' />,
        items: [
          { path: '/profile', label: 'Profile' },
          { path: '/blog', label: 'Blog' },
          { path: '/maps', label: 'Maps' },
          { path: '/tables', label: 'Tables' },
          { path: '/charts', label: 'Charts' },
          { path: '/notifications', label: 'Notifications' },
        ],
      },
      {
        label: 'pages',
        icon: <Document size='xsmall' />,
        items: [
          { path: '/login', label: 'Login' },
          { path: '/register', label: 'Register' },
          { path: '/reset_password', label: 'Recover password' },
          { path: '/400', label: '400 error' },
          { path: '/401', label: '401 error' },
          { path: '/403', label: '403 error' },
          { path: '/404', label: '404 error' },
          { path: '/500', label: '500 error' },
          { path: '/503', label: '503 error' },
        ],
      },
    ]}
        >
          <Box pad='medium' flex={false} full='horizontal'>
            inbox
          </Box>
        </Sidebar>
      </SiteLayout>
    );
  }
}
