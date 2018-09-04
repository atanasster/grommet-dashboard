import React from 'react';
import { bindActionCreators } from 'redux';
import { Box } from 'grommet';
import withData from '../apollo/withData';
import connect from '../redux/index';
import { addStatus } from '../redux/notifications/actions';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import GraphQLCoins from '../components/tables/GraphQLCoins';
import LocalDataCoins from '../components/tables/LocalDataCoins';

class TablesPage extends React.Component {
  render() {
    return (
      <SiteLayout title='Tables'>
        <Box margin={{ bottom: 'large' }}>
          <Title label='Local data' />
          <LocalDataCoins />
        </Box>
        <Box margin={{ bottom: 'large' }}>
          <Title label='GraphQL server side paging, sorting, filtering' />
          <GraphQLCoins />
        </Box>
      </SiteLayout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addStatus }, dispatch);


export default withData(connect(null, mapDispatchToProps)(TablesPage));

