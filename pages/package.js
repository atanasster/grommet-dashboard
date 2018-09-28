import React from 'react';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { Box, Tabs, Tab, Text } from 'grommet';
import { Sidebar } from 'grommet-controls';
import gitUrilParse from 'git-url-parse';
import SiteLayout from '../components/layouts/SiteLayout';
import connect from '../redux';
import { npmRetrieveHistory } from '../redux/npm/actions';
import Dependencies from '../components/npm/Dependencies';
import Dependents from '../components/npm/Dependents';
import Versions from '../components/npm/Versions';
import DistributionTags from '../components/npm/DistributionTags';
import Issues from '../components/npm/Issues';
import Readme from '../components/npm/Readme';
import PackageInfo from '../components/npm/PackageInfo';
import GitHubStats from '../components/github/GithubStats';

const TabTitle = ({ label, color }) => (
  <Text size='large' color={color}>{label}</Text>
);

class Home extends React.Component {
  state = {
    gitProps: null,
    registry: undefined,
    version: undefined,
    dependents: undefined,
    pullRequests: undefined,
    issues: undefined,
    collaborators: {},
  };

  loadPackageInfo(props) {
    const { period, router: { query: { name, version: packageVersion } } } = props;
    if (name !== this.name || packageVersion !== this.version) {
      this.name = name;
      this.version = packageVersion;
      this.props.npmRetrieveHistory(name, period);
      fetch(`/api/registry/${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then((registry) => {
          if (this.mounted) {
            const gitProps = gitUrilParse(registry.repository.url);
            this.version = packageVersion || registry['dist-tags'].latest;
            const version = registry && registry.versions[this.version];
            this.setState({
              registry,
              gitProps,
              version,
              collaborators: {},
            });
            const github = new GitHubStats();
            github.repoPullRequests({
              owner: gitProps.owner,
              repo: gitProps.name,
            }).then(p => this.mounted && p && p.data && this.setState({ pullRequests: p.data }));
            github.repoIssues({
              owner: gitProps.owner,
              repo: gitProps.name,
            }).then(p => this.mounted && p && p.data && this.setState({ issues: p.data }));
            if (version && version.maintainers) {
              version.maintainers.forEach(user =>
                github.userInfo({
                  username: user.name,
                })
                  .then(p => this.mounted && p && p.data && this.setState({
                    collaborators:
                      { ...this.state.collaborators, [user.name]: p.data },
                  })));
            }
          }
        });
      fetch(`/api/dependents/${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then((dependents) => {
          if (this.mounted) {
            this.setState({ dependents: dependents.rows });
          }
        });
    }
  }
  componentDidMount() {
    this.mounted = true;
    this.loadPackageInfo(this.props);
  }
  componentWillReceiveProps(props) {
    this.loadPackageInfo(props);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { router: { query: { name } } } = this.props;
    const {
      gitProps, registry, dependents, version, pullRequests, issues, collaborators,
    } = this.state;
    return (
      <SiteLayout title={name}>
        <Box direction='row-responsive'>
          <Sidebar
            title={`${name}@${this.version || ''}`}
          >
            {version && (
              <PackageInfo
                gitProps={gitProps}
                version={version}
                pullRequests={pullRequests}
                issues={issues}
                collaborators={collaborators}
                modified={registry && registry.time.modified}
                created={registry && registry.time.created}
              />
            )}
          </Sidebar>
          <Box fill='horizontal'>
            <Tabs>
              <Tab
                title={<TabTitle label='Readme' color='accent-1' />}
              >
                <Box pad='medium'>
                  <Readme
                    readme={registry && registry.readme}
                    gitProps={gitProps}
                  />
                </Box>
              </Tab>
              <Tab
                title={<TabTitle
                  label={`${version && version.dependencies ? Object.keys(version.dependencies).length : ''} Dependencies`}
                  color='accent-2'
                />}
              >
                <Box pad='medium' gap='medium'>
                  <Dependencies
                    title='Dependencies'
                    dependencies={version ? version.dependencies : {}
                    }
                  />
                  <Dependencies
                    title='Dev dependencies'
                    dependencies={version ? version.devDependencies : {}
                    }
                  />
                  <Dependencies
                    title='Peer dependencies'
                    dependencies={version ? version.peerDependencies : {}
                    }
                  />
                </Box>
              </Tab>
              <Tab
                title={<TabTitle
                  label={`${dependents ? dependents.length : ''} Dependents`}
                  color='accent-3'
                />}
              >
                <Box pad='medium'>
                  <Dependents
                    title='Dependents'
                    dependents={dependents || []}
                  />
                </Box>
              </Tab>
              <Tab
                title={<TabTitle
                  label={`${registry ? Object.keys(registry.versions).length : ''} Versions`}
                  color='accent-4'
                />}
              >
                {registry && (
                  <Box pad='medium' gap='large' fill='horizontal'>
                    <DistributionTags name={name} tags={registry['dist-tags']} />
                    <Versions name={name} versions={registry.versions} time={registry.time} />
                  </Box>
                )}
              </Tab>
              <Tab
                title={<TabTitle
                  label={`${issues ? issues.length : ''} Issues`}
                  color='neutral-1'
                />}
              >
                {issues && (
                  <Box pad='medium' fill='horizontal'>
                    <Issues issues={issues} />
                  </Box>
                )}

              </Tab>
              <Tab
                title={<TabTitle
                  label={`${pullRequests ? pullRequests.length : ''} Pull requests`}
                  color='neutral-2'
                />}
              >
                <Box pad='medium' fill='horizontal' align='center'>
                  <Text size='large'>Pull requests - not yet implemented</Text>
                </Box>
              </Tab>
              <Tab
                title={<TabTitle
                  label={`${collaborators ? Object.keys(collaborators).length : ''} Collaborators`}
                  color='neutral-1'
                />}
              >
                <Box pad='medium' fill='horizontal' align='center'>
                  <Text size='large'>Collaborators - not yet implemented</Text>
                </Box>
              </Tab>
            </Tabs>
          </Box>
        </Box>
      </SiteLayout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    npmRetrieveHistory,
  }, dispatch);

const mapStateToProps = state => ({
  period: state.npm.period,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
