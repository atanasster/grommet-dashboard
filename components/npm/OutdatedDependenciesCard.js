import React from 'react';
import { Box, Text } from 'grommet';
import { Value, Card } from 'grommet-controls';
import Title from '../layouts/Title';
import PackageAnchor from './PackageAnchor';

export default ({ dependencies, title, ...rest }) => (
  <Box>
    <Title label={title} />
    <Box direction='row' wrap={true}>
      {dependencies && Object.keys(dependencies)
        .sort()
        .map(key => (
          <Card
            background='status-error'
            margin='small'
            pad='small'
            basis='medium'
            gap='medium'
            key={`${title}_${key}`}
            {...rest}
          >
            <Box>
              <PackageAnchor packageName={key}>
                <Text size='large'>
                  {key}
                </Text>
              </PackageAnchor>

            </Box>
            <Box direction='row' justify='between' fill='horizontal'>
              <Value
                value={dependencies[key].required}
                label='required'
              />
              <Value
                value={dependencies[key].stable}
                label='stable'
              />
              <Value
                value={dependencies[key].latest}
                label='latest'
              />
            </Box>
          </Card>
          ))
      }
    </Box>
  </Box>
);
