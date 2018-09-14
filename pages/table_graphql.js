import React from 'react';
import withData from '../apollo/withData';
import TableLayout from '../components/tables/TableLayout';
import GraphQLCoins from '../components/tables/GraphQLCoins';

const GraphQLTable = () => (
  <TableLayout title='GraphQL table' active='graphql'>
    <GraphQLCoins />
  </TableLayout>
);

export default withData(GraphQLTable);

