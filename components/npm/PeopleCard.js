import React from 'react';
import TableCard from './TableCard';

export default ({ data, title, ...rest }) => (
  <TableCard
    title={title}
    columns={[
      {
        accessor: 'username',
        Header: 'name',
      },
      {
        accessor: 'email',
        Header: 'email',
      },
    ]}
    data={data}
    defaultSorted={[{ id: 'username', desc: false }]}
    {...rest}
  />
);
