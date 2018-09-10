import React from 'react';
import TableCard from './TableCard';

export default ({ statuses, ...rest }) => (
  <TableCard
    title='Github statuses'
    columns={[
      {
        accessor: 'context',
        Header: 'context',
      },
      {
        accessor: 'state',
        Header: 'state',
      },
    ]}
    data={statuses}
    defaultSorted={[{ id: 'context', desc: false }]}
    {...rest}
  />
);
