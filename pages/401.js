import React from 'react';
import ErrorPage from '../components/ErrorPage';


export default () => (
  <ErrorPage
    statusCode={401}
    message='You are not authorized to access this page.'
  />
);
