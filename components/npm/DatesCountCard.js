import React from 'react';
import moment from 'moment';
import TableCard from './TableCard';

export default ({ title, data, ...rest }) => (
  <TableCard
    title={title}
    columns={[
      {
        accessor: 'from',
        Header: 'from',
        Cell: row => moment(row.value).format('L'),
      },
      {
        accessor: 'to',
        Header: 'to',
        Cell: row => moment(row.value).format('L'),
      },
      {
        accessor: 'count',
        Header: '#',
      },
    ]}
    data={data}
    defaultSorted={[{ id: 'from', desc: true }]}
    {...rest}
  />
);
