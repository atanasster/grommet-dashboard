/* eslint-disable camelcase */
import Github from '@octokit/rest';
import { store } from '../../redux';
import { addError } from '../../redux/notifications/actions';


export default class GithubStats {
  constructor() {
    this.github = Github();
  }
  catchError = apiCall => apiCall
    .catch(e => store.dispatch(addError(JSON.parse(e.message).message)));
  getOrgRepos = org => this.catchError(this.github.repos.getForOrg({ org, per_page: 100 }));

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
    this.catchError(this.github.activity.getStargazersForRepo({ owner, repo }));

  readMeForRepo = ({ owner, repo }) =>
    this.catchError(this.github.repos.getReadme({ owner, repo }));

  repoPullRequests = ({ owner, repo, ...rest }) =>
    this.catchError(this.github.pullRequests.getAll({ owner, repo, ...rest }));

  repoIssues = ({
    owner, repo, per_page = 100, ...rest
  }) =>
    this.catchError(this.github.issues.getForRepo({
      owner, repo, per_page, ...rest,
    }));
  repoCollaborators = ({ owner, repo, ...rest }) =>
    this.catchError(this.github.repos.getCollaborators({ owner, repo, ...rest }))
  userInfo = ({ username, ...rest }) =>
    this.catchError(this.github.users.getForUser({ username, ...rest }));
}
