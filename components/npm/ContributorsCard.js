import React from 'react';
import TableCard from './TableCard';

export default ({ contributors, ...rest }) => (
  <TableCard
    title='Contributors'
    {...rest}
    columns={[
      {
        accessor: 'username',
        Header: 'author',
      },
      {
        accessor: 'commitsCount',
        Header: 'commits',
      },
    ]}
    data={contributors}
    defaultSorted={[{ id: 'commitsCount', desc: true }]}
  />
);
