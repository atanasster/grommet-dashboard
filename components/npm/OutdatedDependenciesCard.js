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
        accessor: 'required',
        Header: 'required',
      },
      {
        accessor: 'stable',
        Header: 'stable',
      },
      {
        accessor: 'latest',
        Header: 'latest',
      },
    ]}
    data={dependencies ? Object.keys(dependencies)
      .map(key => ({
        package: key,
        required: dependencies[key].required,
        stable: dependencies[key].stable,
        latest: dependencies[key].latest,
      })) : []}
    defaultSorted={[{ id: 'package', desc: false }]}
    {...rest}
  />
);
