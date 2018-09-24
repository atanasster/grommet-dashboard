import React from 'react';
import 'isomorphic-unfetch';
import ReactMarkdown from 'react-markdown';
import GitHubStats from '../github/GithubStats';

class Readme extends React.Component {
  state = {
    content: undefined,
  };

  loadReadmeContent(props) {
    const { content } = this.state;
    const { readme, gitProps } = props;
    if (content === undefined) {
      if (readme) {
        this.setState({ content: readme });
      } else if (gitProps) {
        const github = new GitHubStats();
        github.readMeForRepo({
          owner: gitProps.owner,
          repo: gitProps.name,
        }).then(p => this.mounted && p && p.data &&
          this.setState({ content: atob(p.data.content) }));
      }
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.loadReadmeContent(this.props);
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentWillReceiveProps(newProps) {
    this.loadReadmeContent(newProps);
  }

  render() {
    const { content } = this.state;
    return (
      <React.Fragment>
        {content && (
          <ReactMarkdown source={content} />
        )}
      </React.Fragment>
    );
  }
}

export default Readme;
