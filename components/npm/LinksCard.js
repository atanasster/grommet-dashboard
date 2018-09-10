import React from 'react';
import { Anchor } from 'grommet';
import TableCard from './TableCard';

export default ({ links, ...rest }) => (
  <TableCard
    title='Links'
    columns={[
      {
        accessor: 'name',
        Header: 'name',
      },
      {
        accessor: 'link',
        Header: 'link',
        Cell: row => <Anchor href={row.value} target='_blank' label={row.value} />,
      },
    ]}
    data={links && Object.keys(links).map(key => ({ name: key, link: links[key] }))}
    defaultSorted={[{ name: 'name', desc: false }]}
    {...rest}
  />
);
