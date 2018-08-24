import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import { ColoredPercentChange, FormattedMoneyValue } from '../../utils/formatters';
import PagingGraphqlList, { withGraphQLList } from './PagingGraphqlList';
import { allCoinsQuery } from './graphql/queries';

const Coin = ({ coin }) => (
  <Box direction='row' gap='small' align='center'>
    <ImageStamp
      src={coin.image}
      size='small'
    />
    <Text size='large' weight='bold'>
      {coin.symbol}
    </Text>
  </Box>
);

class CoinsList extends React.Component {
  onExpand = row => (
    <Box pad='medium' >
      <Paragraph>
        {row.original.description}
      </Paragraph>
    </Box>
  );

  render() {
    const {
      data, loadMoreEntries, algorithm, proofType,

    } = this.props;
    const columns = [
      {
        Header: 'Coin',
        accessor: 'symbol',
        Cell: cell => (
          <Coin
            coin={cell.original}
          />
        ),
      }, {
        Header: 'Market cap',
        accessor: 'stats.marketCap',
        maxWidth: 150,
        Cell: cell => (
          <FormattedMoneyValue
            value={cell.value}
          />
        ),
        getProps: () => ({ align: 'end' }),
      }, {
        Header: 'Algo',
        accessor: 'algorithm.name',
      }, {
        Header: 'Proof',
        accessor: 'proofType.name',
      },
      {
        Header: 'Price',
        accessor: 'stats.price',
        maxWidth: 120,
        Cell: cell => (<FormattedMoneyValue value={cell.value} />),
        getProps: () => ({ align: 'end' }),
      }, {
        Header: '%7d',
        accessor: 'stats.percentChange7d',
        maxWidth: 120,
        Cell: cell => (<ColoredPercentChange value={cell.value / 100} />),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: 'Circulation',
        accessor: 'stats.availableSupply',
        Cell: cell => (
          <FormattedMoneyValue value={cell.value} />
        ),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: 'Total',
        accessor: 'stats.totalSupply',
        Cell: cell => (
          <FormattedMoneyValue value={cell.value} />
        ),
        getProps: () => ({ textAlign: 'end' }),
      },
    ];
    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        aliases={{ 'stats': 'tickers_coinkeystats' }}
        ordering={[{ id: 'stats.marketCap', desc: true }]}
        gqlProps={{
 hasMarketCap: true, hasICO: false, algorithm, proofType,
}}
      />
    );
  }
}

CoinsList.defaultProps = {
  algorithm: undefined,
  proofType: undefined,
};
CoinsList.propTypes = {
  algorithm: PropTypes.string,
  proofType: PropTypes.string,
};

export default withGraphQLList(allCoinsQuery, CoinsList);

