/* eslint-disable no-underscore-dangle */
import { Box, Text, Heading } from 'grommet';
import { Card } from 'grommet-controls';
import { Code, Document } from 'grommet-icons';
import RoutedButton from '../RoutedButton';
import Section from './Section';
import Example from './Example';

export default ({ examples, group }) => (
  <Section name={group}>
    {Object.keys(examples).filter(key => (examples[key].category === group)).sort().map(item => (
      <Card background='brand' key={`${group}_${item}`} basis='medium' margin='xsmall'>
        <Card.CardTitle justify='between'>
          <RoutedButton route='documentation' params={{ component: item }}>
            <Heading margin='none' level={3}>
              {item}
            </Heading>
          </RoutedButton>
          <Text size='small'>
            {examples[item].package}
          </Text>
        </Card.CardTitle>
        <Card.CardContent flex={false} basis='220px' align='center' justify='center'>
          <Example code={examples[item].examples._starter} />
        </Card.CardContent>
        <Card.CardActions>
          <Box direction='row' justify='between' fill='horizontal'>
            <RoutedButton
              route='documentation'
              params={{ component: item }}
            >
              <Box direction='row' gap='xsmall' pad='xsmall'>
                <Document />
                Docs
              </Box>
            </RoutedButton>

            <RoutedButton
              route='examples'
              params={{ group: item, example: '_starter' }}
            >
              <Box direction='row' gap='xsmall' pad='xsmall'>
                <Code />
                Code
              </Box>
            </RoutedButton>
          </Box>
        </Card.CardActions>
      </Card>
      ))}
  </Section>
);
