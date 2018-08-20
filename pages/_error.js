import React from 'react';
import ErrorPage from '../components/layouts/ErrorPage';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    let status;
    if (res) {
      status = res.statusCode;
    } else if (err) {
      status = err.statusCode;
    } else {
      status = null;
    }
    return { status };
  }

  render() {
    return (
      <ErrorPage
        statusCode={this.props.status}
      />
    );
  }
}
