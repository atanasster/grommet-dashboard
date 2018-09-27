import React from 'react';
import moment from 'moment';
import { Box, Grid, Text, Anchor } from 'grommet';
import ReactMarkdown from 'react-markdown';
import { Clock, Close, ShareOption } from 'grommet-icons';
import { Tags, Tag, Card } from 'grommet-controls';
import Title from '../layouts/Title';
import GithubUser from './GithubUser';
import IssuesByLabel from './IssuesByLabel';
import IssuesByUser from './IssuesByUser';
import IssuesByAssignee from './IssuesByAssignee';

const Statuses = {
  open: {
    background: 'status-ok',
    icon: <Clock />,
    label: 'Open',
  },
  closed: {
    color: 'status-error',
    icon: <Close />,
    label: 'Closed',
  },
  merged: {
    color: 'status-warning',
    icon: <ShareOption />,
    label: 'Merged',
  },

};
export default ({ issues }) => (
  <Box gap='large'>
    <Box>
      <Title label={`${issues ? issues.length : ''} open issues`} />
      <Grid columns='medium' gap='medium'>
        <IssuesByLabel issues={issues} />
        <IssuesByUser issues={issues} />
        <IssuesByAssignee issues={issues} />
      </Grid>
    </Box>
    <Box>
      <Title label='List of issues' />
      <Grid columns='medium' rows='medium' gap='medium'>
        {issues && issues
          .map((issue) => {
            const assignedTo = issue.assignees || (issue.assignee ? [issue.assignee] : []);
            return (
              <Card
                pad='small'
                key={`issue_${issue.number}`}
              >
                <Box fill='horizontal' basis='xsmall' justify='between' pad={{ vertical: 'small' }} border='bottom'>
                  <Box gap='small'>
                    <Box direction='row' justify='between' align='center'>
                      <Box direction='row' gap='small' align='center'>
                        <GithubUser user={issue.user} />
                        <Text size='small'>
                          {`${issue.user.login} opened ${moment(issue.created_at).fromNow()}`}
                        </Text>
                      </Box>
                      {Statuses[issue.state] && (
                        <Tag gap='small' pad={{ horizontal: 'small' }} {...Statuses[issue.state]} />
                      )}

                    </Box>
                    <Anchor target='_blank' href={issue.html_url}>
                      <Text
                        size='large'
                        truncate={true}
                      >
                        {issue.title}
                      </Text>
                    </Anchor>
                  </Box>
                </Box>
                {issue.labels.length > 0 && (
                  <Box basis='xsmall' align='start' fill='horizontal' border='bottom'>
                    <Tags
                      pad={{ vertical: null }}
                      placeholder='No labels assigned'
                      value={issue.labels.map(label => ({ label: label.name, background: `#${label.color}` }))}
                      tagProps={{
                        border: 'all', size: 'medium', pad: 'xsmall', icon: null,
                      }}
                    />
                  </Box>
                )}
                {assignedTo.length > 0 && (
                  <Box align='start' fill='horizontal' border='bottom'>
                    <Text>assignees:</Text>
                    <Box direction='row' wrap={true}>
                      {assignedTo.map(user => (
                        <Box key={`assignee_user_${user.login} `} pad='xxsmall' direction='row'>
                          <GithubUser user={user} />
                        </Box>
                    ))}
                    </Box>
                  </Box>
                )}
                {issue.body && (
                  <Box gap='medium' fill={true} pad='small' style={{ overflow: 'auto', height: '100%' }}>
                    <ReactMarkdown
                      source={issue.body}
                    />
                  </Box>
                )}
              </Card>
            );
          })
        }
      </Grid>
    </Box>
  </Box>
);
