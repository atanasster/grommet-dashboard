import React from 'react';
import moment from 'moment';
import { Box, Anchor, Text } from 'grommet';
import { Value } from 'grommet-controls';
import NPMTrendsChart from '../charts/NPMTrendsChart';
import GithubUser from './GithubUser';

const extractHostName = (url) => {
  if (!url) {
    return null;
  }
  let hostname;
  if (url.indexOf('//') > -1) {
    [, , hostname] = url.split('/');
  } else {
    [hostname] = url.split('/');
  }

  // find & remove port number
  [hostname] = hostname.split(':');
  // find & remove "?"
  [hostname] = hostname.split('?');

  return hostname;
};
class PackageInfo extends React.Component {
  render() {
    const {
      version, created, modified, pullRequests, issues, collaborators,
    } = this.props;
    return (
      <Box pad='large' >
        <Box pad='small' background='light-3' border={{ side: 'left', size: 'large' }}>
          <div style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>npm i {version && version.name}</div>
        </Box>
        <Box pad={{ vertical: 'medium' }}>
          <NPMTrendsChart
            packages={[version.name]}
            title={null}
            yAxis={false}
            xAxis={false}
            basis='small'
          />
        </Box>
        <Box pad={{ vertical: 'medium' }} direction='row' border='top' fill='horizontal' justify='between'>
          <Value size='large' value={version ? version.version : '-'} label='version' />
          <Value size='large' value={version ? version.license : '-'} label='license' />
        </Box>

        <Box pad={{ vertical: 'medium' }} direction='row' border='top' fill='horizontal' justify='between'>
          <Value size='large' value={pullRequests ? pullRequests.length : '-'} label='pull requests' />
          <Value size='large' value={issues ? issues.length : '-'} label='open issues' />
        </Box>
        <Box pad={{ vertical: 'medium' }} direction='row' border='top' fill='horizontal' gap='large'>
          <Box basis='2/3'>
            <Value
              size='large'
              value={version ? (
                <Anchor
                  target='_blank'
                  href={version.homepage}
                  label={(
                    <Text size='large' truncate={true}>
                      {extractHostName(version.homepage)}
                    </Text>
                  )}
                />
              ) : '-'}
              label='homepage'
            />
          </Box>
          <Box basis='1/3'>
            <Value
              size='large'
              value={version ? (
                <Anchor
                  target='_blank'
                  href={version.repository.url.split('+')[1]}
                  label={(
                    <Text size='large' truncate={true}>
                      {version.repository.type}
                    </Text>
                  )}
                />) : '-'
              }
              label='repository'
            />
          </Box>
        </Box>
        <Box pad={{ vertical: 'medium' }} direction='row' border='top' fill='horizontal' justify='between'>
          <Value size='medium' value={created ? moment(created).fromNow() : '-'} label='created' />
          <Value size='medium' value={modified ? moment(modified).fromNow() : '-'} label='last modified' />
        </Box>
        <Box pad={{ vertical: 'medium' }} border='top' fill='horizontal'>
          <Text size='large'>
            collaborators
          </Text>
          <Box direction='row' wrap={true}>
            {Object.keys(collaborators).sort().map(user => (
              <Box key={`git_user_${user} `} pad='xxsmall' direction='row'>
                <GithubUser user={collaborators[user]} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default PackageInfo;
