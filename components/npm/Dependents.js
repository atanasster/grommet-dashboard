import React from 'react';
import { Box, Text, Paragraph } from 'grommet';
import { Card } from 'grommet-controls';
import Title from '../layouts/Title';
import PackageAnchor from './PackageAnchor';

export default ({ dependents, title, ...rest }) => (
  <Box>
    <Title label={title} />
    <Box direction='row' wrap={true}>
      {dependents && dependents
        .sort((a, b) => {
          if (a.key[1] < b.key[1]) return -1;
          if (a.key[1] > b.key[1]) return 1;
          return 0;
        })
        .map(({ key: dependent }) => (
          <Card
            margin='small'
            pad='small'
            basis='medium'
            key={`${title}_${dependent[1]}`}
            {...rest}
          >
            <Box pad='medium' align='start' fill='horizontal'>
              <PackageAnchor packageName={dependent[1]}>
                <Text size='large'>
                  {dependent[1]}
                </Text>
              </PackageAnchor>
              <Paragraph size='small'>
                {dependent[2]}
              </Paragraph>
            </Box>
          </Card>
          ))
      }
    </Box>
  </Box>
);
