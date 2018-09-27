import React from 'react';
import moment from 'moment';
import { Box, Text } from 'grommet';
import { Card } from 'grommet-controls';
import Title from '../layouts/Title';
import PackageAnchor from './PackageAnchor';


export default ({ name, time }) => (
  <Box>
    <Title label='Versions' />
    <Box direction='row' wrap={true}>
      {Object.keys(time)
        .filter(t => (t !== 'modified' && t !== 'created'))
        .sort((a, b) => {
          if (time[a] > time[b]) return -1;
          if (time[a] < time[b]) return 1;
          return 0;
        })
        .map(version => (
          <Card
            margin='small'
            pad='small'
            basis='medium'
            key={`${name}_${version}`}
          >
            <Box pad='medium' align='start' fill='horizontal' gap='small'>
              <PackageAnchor packageName={name} version={version}>
                <Text size='large'>
                  {`${name}@${version}`}
                </Text>
              </PackageAnchor>
              <Text size='small'>
                {moment(time[version]).fromNow()}
              </Text>
            </Box>
          </Card>
          ))
      }
    </Box>
  </Box>
);
