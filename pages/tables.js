import React from 'react';
import TableLayout from '../components/tables/TableLayout';
import LocalDataCoins from '../components/tables/LocalDataCoins';

export default () => (
  <TableLayout title='Local table' active='local'>
    <LocalDataCoins />
  </TableLayout>
);
