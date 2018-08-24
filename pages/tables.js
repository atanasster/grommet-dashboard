import React from 'react';
import { bindActionCreators } from 'redux';
import { Box } from 'grommet';
import withData from '../apollo/withData';
import connect from '../redux/index';
import { addStatus } from '../redux/notifications/actions';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import CoinsList from '../components/tables/CoinsList';

class TablesPage extends React.Component {
  render() {
    return (
      <SiteLayout title='GraphQL Server Side'>
        <Box margin={{ bottom: 'large' }}>
          <Title label='GraphQL server' />
          <CoinsList />

        </Box>
      </SiteLayout>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addStatus }, dispatch);


export default withData(connect(null, mapDispatchToProps)(TablesPage));

