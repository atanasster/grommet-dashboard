import React from 'react';
import { Box, Paragraph } from 'grommet';
import { PagingTable } from 'grommet-controls';
import columns from './columns';
import data from './data/coins';

export default class LocalDataCoins extends React.Component {
  onExpand = row => (
    <Box pad='medium' >
      <Paragraph>
        {row.original.description}
      </Paragraph>
    </Box>
  );

  render() {
    return (
      <PagingTable
        columns={columns}
        data={data}
        SubComponent={this.onExpand}
        decorations={{
          table: { elevation: 'large', border: 'all' },
          header: { border: 'all', align: 'center' },
          filter: { background: 'light-2', border: 'all' },
          body: { animation: { type: 'fadeIn', duration: 2000, size: 'large' } },
          row: {
            align: 'center',
          },
          rowOdd: {
            background: { color: 'light-2', opacity: 'medium' },
            border: 'horizontal',
            align: 'center',
          },
          footer: { background: 'accent-2' },
          pagination: { pad: { vertical: 'medium' } },
        }}
        defaultSorted={[{ id: 'stats.marketCap', desc: true }]}
      />
    );
  }
}

