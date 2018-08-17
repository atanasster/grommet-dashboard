import React from 'react';
import { Box, Grid, Heading } from 'grommet';
import Page from '../components/Page';
import connect from '../redux';
import PackageSelector from '../components/PackageSelector';
import NPMStats from '../components/NPMStats';
import DonutChart from '../components/charts/DonutChart';
import LineChart from '../components/charts/LineChart';
import DistributionCard from '../components/Distribution';

class Home extends React.Component {
  render() {
    const { packages } = this.props;
    return (
      <Page title='Home'>
        <Box>
          <PackageSelector />
          <Box direction='row' gap='xlarge' margin={{ bottom: 'large' }}>
            <Box basis='medium' overflow='hidden'>
              <Heading level={3}>
                <strong>Dashboard</strong>
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box gap='medium'>
          <LineChart />
          <DistributionCard pName='downloadsCount' title='Downloads' />
          <Grid columns='medium' gap='medium' justify='between'>
            {packages.map((pckg, index) => <NPMStats key={`npm-stats-${pckg.name}`} pckg={pckg} index={index} />)}
          </Grid>
          <Grid columns='medium' gap='medium' justify='between'>
            <DonutChart pName='dependentsCount' title='Dependents' />
            <DonutChart pName='communityInterest' title='Community interest' />
            <DonutChart pName='downloadsAcceleration' title='Downloads acceleration' />
          </Grid>
        </Box>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default connect(mapStateToProps)(Home);
