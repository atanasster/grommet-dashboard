import React from 'react';
import { Box, Paragraph } from 'grommet';
import PagingGraphqlList, { withGraphQLList } from './graphql/PagingGraphqlList';
import { allCoinsQuery } from './graphql/queries';
import columns from './columns';

class GraphQLCoins extends React.Component {
  onExpand = row => (
    <Box pad='medium' >
      <Paragraph>
        {row.original.description}
      </Paragraph>
    </Box>
  );

  render() {
    const { data, loadMoreEntries } = this.props;

    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        aliases={{ 'stats': 'tickers_coinkeystats' }}
        ordering={[{ id: 'stats.marketCap', desc: true }]}
        gqlProps={{
         hasMarketCap: true,
         hasICO: false,
        }}
      />
    );
  }
}


export default withGraphQLList(allCoinsQuery, GraphQLCoins);

