import React from 'react';
import TableCard from './TableCard';

export default ({ dependencies, title, ...rest }) => (
  <TableCard
    title={title}
    columns={[
      {
        accessor: 'package',
        Header: 'package',
      },
      {
        accessor: 'version',
        Header: 'version',
      },
    ]}
    data={dependencies ? Object.keys(dependencies)
      .map(key => ({ package: key, version: dependencies[key] })) : []}
    defaultSorted={[{ id: 'package', desc: false }]}
    {...rest}
  />
);
