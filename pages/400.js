import React from 'react';
import ErrorPage from '../components/ErrorPage';


export default () => (
  <ErrorPage
    statusCode={400}
    message='The server was unable to process your request.'
  />
);
