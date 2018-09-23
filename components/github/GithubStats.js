/* eslint-disable camelcase */
import Github from '@octokit/rest';

export default class GithubStats {
  constructor() {
    this.github = Github();
  }
  getOrgRepos = org => this.github.repos.getForOrg({ org, per_page: 100 })
  getOrgStats = org => this.getOrgRepos(org).then(({ data }) => {
    const repos = data
      .map(repo => ({ name: repo.name, stars: parseInt(repo.stargazers_count, 10) }))
      .sort((a, b) => b.stars - a.stars);

    const totalStars = repos.reduce((total, current) => total + current.stars, 0);

    return {
      totalStars,
      repos,
    };
  });
  stargazersForRepo = ({ owner, repo }) =>
    this.github.activity.getStargazersForRepo({ owner, repo });

  readMeForRepo = ({ owner, repo }) =>
    this.github.repos.getReadme({ owner, repo });

  repoPullRequests = ({ owner, repo, ...rest }) =>
    this.github.pullRequests.getAll({ owner, repo, ...rest });
  repoIssues = ({
    owner, repo, per_page = 100, ...rest
  }) =>
    this.github.issues.getForRepo({
      owner, repo, per_page, ...rest,
    });
  repoCollaborators = ({ owner, repo, ...rest }) =>
    this.github.repos.getCollaborators({ owner, repo, ...rest });
  userInfo = ({ username, ...rest }) =>
    this.github.users.getForUser({ username, ...rest });
}
