import React from 'react';
import ErrorPage from '../components/ErrorPage';


export default () => (
  <ErrorPage
    statusCode={503}
    message='The page is temporarily unavailable.'
  />
);
