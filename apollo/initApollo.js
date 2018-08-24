import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  const httpLink = createHttpLink({
    uri: 'https://serene-lowlands-55378.herokuapp.com/graphql',
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, config) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, config);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, config);
  }

  return apolloClient;
}
