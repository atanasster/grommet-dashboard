import gql from 'graphql-tag';


// eslint-disable-next-line import/prefer-default-export
export const allCoinsQuery = gql`
   query getAllCoins($offset: Int!, $limit: Int!, $ordering: String, $hasMarketCap: Boolean, $hasICO: Boolean, $hasPriceChange: Boolean, $name: String, $algorithm: String, $proofType: String) {
    list: allCoins(hasMarketCap: $hasMarketCap, hasIco: $hasICO, hasPriceChange: $hasPriceChange, name_Icontains: $name, algorithm: $algorithm, proofType: $proofType) {
      totalCount
      results(offset: $offset, limit: $limit, ordering: $ordering) {
        stats {
          price
          marketCap
          priceBtc
          availableSupply
          totalSupply
          percentChange7d
        }  
        symbol: slug
        image
        name
        description
        algorithm {
          name
        }  
        proofType {
          name
        }
        fullyPremined
        preMinedValue
      }
    }  
  }
`;
