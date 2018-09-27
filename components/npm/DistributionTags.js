import React from 'react';
import { Box, Text } from 'grommet';
import { Card } from 'grommet-controls';
import Title from '../layouts/Title';
import PackageAnchor from './PackageAnchor';


export default ({ name, tags }) => (
  <Box>
    <Title label='Distribution tags' />
    <Box direction='row' wrap={true}>
      {Object.keys(tags)
        .map(tag => (
          <Card
            margin='small'
            pad='small'
            basis='medium'
            key={`${name}_${tag}`}
          >
            <Box pad='medium' align='start' fill='horizontal' gap='small'>
              <PackageAnchor packageName={name} version={tags[tag]}>
                <Text size='large'>
                  {`${name}@${tags[tag]}`}
                </Text>
              </PackageAnchor>
              <Text weight='bold'>
                {tag}
              </Text>
            </Box>
          </Card>
          ))
      }
    </Box>
  </Box>
);
