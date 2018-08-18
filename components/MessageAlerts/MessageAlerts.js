import React from 'react';
import { Box, Text, Menu, Stack } from 'grommet';
import { Notification } from 'grommet-icons';

export default ({ notifications }) => (
  <Menu
    dropAlign={{ top: 'bottom', right: 'right' }}
    icon={(
      <Stack
        anchor='top-right'
      >
        <Notification />
        <Box background='rgba(255, 0, 0, 0.6)' pad='xxsmall'>
          <Text weight='bold' color='white' size='small' style={{ lineHeight: 1 }}>
            {notifications.length}
          </Text>
        </Box>
      </Stack>
    )}
    items={notifications}
  />
);

