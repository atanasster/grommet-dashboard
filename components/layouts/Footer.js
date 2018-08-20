import React from 'react';
import { Box, Anchor } from 'grommet';

export default () => (
  <Box
    tag='footer'
    direction='row'
    justify='center'
    fill='horizontal'
    justifySelf={true}
  >
    <Box
      fill='horizontal'
      border='top'
      direction='row'
      justify='center'
      pad='medium'
      gap='medium'
    >
      <Anchor
        href='https://github.com/grommet/grommet/tree/NEXT'
        target='_blank'
        a11yTitle='Go to the github page for Grommet 2'
      >
        grommet
      </Anchor>
      <Anchor
        href='https://github.com/atanasster/grommet-dashboard'
        target='_blank'
        a11yTitle='Go to the github page for this project'
      >
        git
      </Anchor>
      <Anchor
        href='https://spectrum.chat/crypto-grommet'
        target='_blank'
        a11yTitle='Go to the spectrum community for this project'
      >
        spectrum
      </Anchor>
    </Box>
  </Box>
);
