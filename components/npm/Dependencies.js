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
            margin='small'
            pad='small'
            basis='medium'
            key={`${title}_${key}`}
            {...rest}
          >
            <Value
              value={(
                <PackageAnchor packageName={key}>
                  <Text size='large'>
                    {key}
                  </Text>
                </PackageAnchor>
              )}
              label={dependencies[key]}
            />
          </Card>
          ))
      }
    </Box>
  </Box>
);
