import Github from '@octokit/rest';

export default class GithubOrgStats {
  constructor(token, org) {
    this.token = token;
    this.org = org;

    this.github = Github();

    this.github.authenticate({
      type: 'token',
      token,
    });
  }
  getOrgRepos = () => this.github.repos.getForOrg({ org: this.org, per_page: 100 })
  get = () => this.getOrgRepos().then(({ data }) => {
    const repos = data
      .map(repo => ({ name: repo.name, stars: parseInt(repo.stargazers_count, 10) }))
      .sort((a, b) => b.stars - a.stars);

    const totalStars = repos.reduce((total, current) => total + current.stars, 0);

    return {
      totalStars,
      repos,
    };
  })
  stargazersForRepo = ({ owner, repo }) =>
    this.github.activity.getStargazersForRepo({ owner, repo })
}
