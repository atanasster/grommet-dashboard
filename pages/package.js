import React from 'react';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { Box } from 'grommet';
import SiteLayout from '../components/layouts/SiteLayout';
import connect from '../redux';
import Title from '../components/layouts/Title';
import { npmRetrieveStats } from '../redux/npm/actions';
import GithubCard from '../components/npm/GithubCard';
import ContributorsCard from '../components/npm/ContributorsCard';
import DatesCountCard from '../components/npm/DatesCountCard';
import LinksCard from '../components/npm/LinksCard';
import PeopleCard from '../components/npm/PeopleCard';
import IssuesDistributionCard from '../components/npm/IssuesDistributionCard';
import StatusesCard from '../components/npm/StatusesCard';
import DependenciesCard from '../components/npm/DependenciesCard';
import OutdatedDependenciesCard from '../components/npm/OutdatedDependenciesCard';

class Home extends React.Component {
  componentDidMount() {
    const { router: { query: { name } } } = this.props;
    this.props.npmRetrieveStats(name);
  }
  render() {
    const { stats, router: { query: { name } } } = this.props;
    return (
      <SiteLayout title={name}>
        <Box>
          <Title label={name} />
        </Box>
        <Box direction='row-responsive' gap='small'>
          <Box basis='1/3' gap='small'>
            <GithubCard
              collected={stats && stats.collected}
            />
            <DatesCountCard
              title='Releases'
              data={stats && stats.collected && stats.collected.metadata ?
                stats.collected.metadata.releases : []
              }
            />

            <DatesCountCard
              title='Commits'
              data={stats && stats.collected && stats.collected.github ?
                stats.collected.github.commits : []
              }
            />
            <IssuesDistributionCard
              issues={stats && stats.collected && stats.collected.github ?
                stats.collected.github.issues.distribution : []
              }
            />
          </Box>
          <Box basis='1/3' gap='small'>
            <ContributorsCard
              contributors={stats && stats.collected && stats.collected.github ?
                stats.collected.github.contributors : []
              }
            />
            <PeopleCard
              title='Maintainers'
              data={stats && stats.collected && stats.collected.metadata ?
                stats.collected.metadata.maintainers : []}
            />
            <DatesCountCard
              title='NPM downloads'
              data={stats && stats.collected && stats.collected.npm ?
                stats.collected.npm.downloads : []
              }
            />
          </Box>
          <Box basis='1/3' gap='small'>
            <OutdatedDependenciesCard
              title='Outdated dependencies'
              background='status-error'
              dependencies={stats && stats.collected && stats.collected.source ?
                stats.collected.source.outdatedDependencies : {}
              }
            />
            <DependenciesCard
              title='Dependencies'
              dependencies={stats && stats.collected && stats.collected.metadata ?
                stats.collected.metadata.dependencies : []
              }
            />
            <DependenciesCard
              title='Dev dependencies'
              dependencies={stats && stats.collected && stats.collected.metadata ?
                stats.collected.metadata.devDependencies : []
              }
            />
            <DependenciesCard
              title='Peer dependencies'
              dependencies={stats && stats.collected && stats.collected.metadata ?
                stats.collected.metadata.peerDependencies : []
              }
            />
          </Box>
        </Box>
        <Box pad={{ vertical: 'small' }} gap='small'>
          <StatusesCard
            statuses={stats && stats.collected && stats.collected.github ?
              stats.collected.github.statuses : []
            }
          />
          <LinksCard
            links={stats && stats.collected && stats.collected.metadata ?
              stats.collected.metadata.links : []}
          />
        </Box>

      </SiteLayout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    npmRetrieveStats,
  }, dispatch);

const mapStateToProps = (state, props) => ({
  stats: state.npm.stats[props.router.query.name],
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
