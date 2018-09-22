import React from 'react';
import styled from 'styled-components';
import { Box, Text, Anchor, Markdown, Paragraph } from 'grommet';
import { Value } from 'grommet-controls';
import { Card } from '../Card';
import Title from '../layouts/Title';

const MarkdownParagraph = styled(Paragraph)`
  max-width: 350px;
`;

export default ({ issues }) => (
  <Box>
    <Title label='Issues' />
    {console.log(issues)}
    <Box direction='row' wrap={true}>
      {issues && issues
        .map(issue => (
          <Card
            margin='small'
            pad='small'
            basis='medium'
            key={`issue_${issue.number}`}
          >
            <Box border='bottom' fill='horizontal' basis='xxsmall'>
              <Anchor target='_blank' href={issue.html_url} >
                <Text size='large'>
                  {issue.title}
                </Text>
              </Anchor>
            </Box>
            <Box gap='medium' fill={true}>
              <Box direction='row' justify='between' border='bottom' fill='horizontal' flex={false}>
                <Value
                  value={issue.comments}
                  label='comments'
                />
                <Value
                  value={issue.labels.length}
                  label='labels'
                />
                <Value
                  value={issue.reactions.total_count}
                  label='reactions'
                />
              </Box>
              <Box pad='small'>
                <Markdown
                  style={{ overflow: 'auto', height: '300px' }}
                  components={{
                    p: { component: MarkdownParagraph, props: { size: 'small' } },
                  }}
                >
                  {issue.body}
                </Markdown>
              </Box>
            </Box>
          </Card>
          ))
      }
    </Box>
  </Box>
);
