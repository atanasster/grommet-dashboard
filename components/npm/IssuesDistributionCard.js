import React from 'react';
import TableCard from './TableCard';


export default ({ issues, ...rest }) => (
  <TableCard
    title='Issues ditribution'
    columns={[
      {
        accessor: 'issues',
        Header: 'issues',
        sortMethod: (a, b) => (a - b),
      },
      {
        accessor: 'count',
        Header: 'count',
      },
    ]}
    data={issues ? Object.keys(issues)
      .map(key => ({ issues: key, count: issues[key] })) : []}
    defaultSorted={[{ id: 'issues', desc: false }]}
    {...rest}
  />
);
