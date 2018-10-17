import React from 'react';
import { Box, Text, Select } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import { ColoredPercentChange, FormattedMoneyValue } from '../../utils/formatters';

const Coin = ({ coin }) => (
  <Box direction='row' gap='small' align='center'>
    <ImageStamp
      src={coin.image}
      size='small'
    />
    <Text weight='bold'>
      {coin.symbol} - {coin.name}
    </Text>
  </Box>
);
export default [
  {
    Header: 'Coin',
    accessor: 'name',
    filterable: true,
    Cell: cell => (
      <Coin
        coin={cell.original}
      />
    ),
    Footer: ({ data, column }) => (
      <Text weight='bold'>{data.length} {column.Header} in memory</Text>
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
    responsiveHide: ['small', 'medium'],
    id: 'algorithm',
    filterable: true,
    Filter: ({ onChange, filter }) => (
      <Box direction='row' alignSelf='stretch'>
        <Select
          style={{ width: '100%' }}
          value={filter && filter.value ? filter.value : 'All'}
          options={['All', 'SHA256', 'SHA3', 'Scrypt', 'NeoScrypt', 'HybridScryptHash256',
                'X11', 'X13', 'X16R',
                'Ouroboros', 'CryptoNight', 'CryptoNight-V7', 'Ethash', 'BLAKE256', 'Blake2b',
                'Lyra2Z', 'Lyra2RE', 'Quark', 'Keccak', 'DPoS', 'Dagger-Hashimoto', 'Shabal256',
                'Groestl', 'Time Travel', 'NIST5']}
          onChange={({ option }) => {
                onChange(option === 'All' ? undefined : option);
              }}
        />
      </Box>
    ),
  }, {
    Header: 'Proof',
    id: 'proofType',
    accessor: 'proofType.name',
    responsiveHide: ['small', 'medium'],
    filterable: true,
    Filter: ({ onChange, filter }) => (
      <Box direction='row'>
        <Select
          style={{ width: '100%' }}
          value={filter && filter.value ? filter.value : 'All'}
          options={['All', 'PoW', 'PoS', 'PoW/PoS', 'PoI', 'DPoS']}
          onChange={({ option }) => {
                onChange(option === 'All' ? undefined : option);
              }}
        />
      </Box>
    ),
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
  },
];
