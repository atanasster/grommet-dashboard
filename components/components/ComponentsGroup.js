/* eslint-disable no-underscore-dangle */
import { Box, Text, Heading } from 'grommet';
import { Card } from 'grommet-controls';
import { Code, Document } from 'grommet-icons';
import RoutedButton from '../RoutedButton';
import Section from './Section';
import Example from './Example';

export default ({ examples, group, search }) => {
  const filtered = examples.filter((exampple) => {
    if (search && search.length > 0 && !exampple.name.toLowerCase().match(search)) {
      return false;
    }
    return exampple.category === group;
  });
  if (filtered.length === 0) {
    return null;
  }
  return (
    <Section name={`${group} (${filtered.length})`}>
      {filtered.sort().map(example => (
        <Card background='brand' key={`${example.package}_${group}_${example.name}`} basis='medium' margin='xsmall'>
          <Card.CardTitle justify='between'>
            <Box gap='small' fill='horizontal'>
              <Box direction='row' justify='between'>
                <RoutedButton route='documentation' params={{ library: example.package, component: example.name }}>
                  <Heading margin='none' level={3}>
                    {example.name}
                  </Heading>
                </RoutedButton>
                <Text size='small'>
                  {example.package}
                </Text>
              </Box>
              <Text size='small' truncate={true}>
                {example.doc && example.doc.description}
              </Text>
            </Box>

          </Card.CardTitle>
          <Card.CardContent flex={false} basis='220px' align='center' justify='center'>
            <Example code={example.examples._starter} />
          </Card.CardContent>
          <Card.CardActions>
            <Box direction='row' justify='between' fill='horizontal'>
              <RoutedButton
                route='documentation'
                params={{ library: example.package, component: example.name }}
              >
                <Box direction='row' gap='xsmall' pad='xsmall'>
                  <Document />
                  Docs
                </Box>
              </RoutedButton>

              <RoutedButton
                route='examples'
                params={{ library: example.package, group: example.name, example: '_starter' }}
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
};
