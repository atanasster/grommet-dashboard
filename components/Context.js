import React from 'react';

const Context = React.createContext();

export const withContext = WrappedComponent => props => (
  <Context.Consumer>
    {context => <WrappedComponent context={context} {...props} />}
  </Context.Consumer>
);

export default Context;
