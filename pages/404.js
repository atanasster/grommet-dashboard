import React from 'react';
import ErrorPage from '../components/ErrorPage';


export default () => (
  <ErrorPage
    statusCode={404}
    message='This page could not be found.'
  />
);
