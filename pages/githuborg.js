import React from 'react';
import { withRouter } from 'next/router';
import { Box } from 'grommet';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import SideMenu from '../components/SideMenu/SideMenu';
import GithubOrgStats from '../components/github/GithubOrgStats';

class Home extends React.Component {
  state = {
    stats: undefined,
    selected: undefined,
  };

  componentDidMount() {
    const { router: { query: { name } } } = this.props;
    const github = new GithubOrgStats(process.env.GITHUB_TOKEN, name);
    github.get()
      .then((stats) => {
        this.setState({ stats, selected: stats.repos ? stats.repos[0].name : undefined });
      });
  }
  render() {
    const { router: { query: { name } } } = this.props;
    const { stats, selected } = this.state;
    return (
      <SiteLayout title={name}>
        <Title label={name} />
        <Box direction='row' gap='medium'>
          <SideMenu
            width='small'
            title={stats ? `total stars: ${stats.totalStars}` : name}
            items={stats ? stats.repos.map(r => ({
              label: r.name,
              widget: r.stars,
            })) : []}
            onSelect={({ label }) => this.setState({ selected: label })}
          />
          selected: {selected}
        </Box>
      </SiteLayout>
    );
  }
}


export default withRouter(Home);
