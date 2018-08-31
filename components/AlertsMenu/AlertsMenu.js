import React from 'react';
import { Box, Text, Menu, Stack } from 'grommet';
import { Notification } from 'grommet-icons';

export default ({ alerts }) => (
  <Menu
    dropAlign={{ top: 'bottom', right: 'right' }}
    items={alerts}
  >
    <Stack anchor='top-right'>
      <Notification />
      <Box background='rgba(255, 0, 0, 0.7)' pad='xsmall' style={{ borderRadius: '50%' }}>
        <Text weight='bold' color='white' size='small' style={{ lineHeight: 1 }}>
          {alerts.length}
        </Text>
      </Box>
    </Stack>
  </Menu>
);

