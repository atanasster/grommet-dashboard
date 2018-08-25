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
        onExpand={this.onExpand}
        defaultSorted={[{ id: 'stats.marketCap', desc: true }]}
      />
    );
  }
}

