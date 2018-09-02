import React from 'react';
import { Box, Grid } from 'grommet';
import SiteLayout from '../components/layouts/SiteLayout';
import connect from '../redux';
import PackageSelector from '../components/PackageSelector';
import NPMStats from '../components/NPMStats';
import DonutChart from '../components/charts/NPMPopularityChart';
import LineChart from '../components/charts/NPMTrendsChart';
import DistributionCard from '../components/Distribution';
import Title from '../components/layouts/Title';

class Home extends React.Component {
  render() {
    const { packages } = this.props;
    return (
      <SiteLayout title='Home'>
        <Box>
          <PackageSelector />
          <Title label='Dashboard' />
        </Box>
        <Box gap='medium'>
          <LineChart />
          <DistributionCard pName='downloadsCount' title='Downloads' />
          <Grid columns='medium' gap='medium'>
            {packages.map((pckg, index) => <NPMStats key={`npm-stats-${pckg.name}`} pckg={pckg} index={index} />)}
          </Grid>
          <Grid columns='medium' gap='medium'>
            <DonutChart pName='dependentsCount' title='Dependents' />
            <DonutChart pName='communityInterest' title='Community interest' />
            <DonutChart pName='downloadsAcceleration' title='Downloads acceleration' />
          </Grid>
        </Box>
      </SiteLayout>
    );
  }
}

const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default connect(mapStateToProps)(Home);
