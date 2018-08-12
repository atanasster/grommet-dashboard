import React from 'react';
import { bindActionCreators } from 'redux';
import { Box, Grid, Heading } from 'grommet';
import Page from '../components/Page';
import NPMStats from '../components/NPMStats';
import DonutChart from '../components/DonutChart';
import connect from '../redux';
import { npmRetrieveStats } from '../redux/npm/actions';

class Home extends React.Component {
  componentDidMount() {
    const { packages } = this.props;
    packages.forEach(p => this.props.npmRetrieveStats(p.name));
  }
  render() {
    const { packages } = this.props;
    return (
      <Page title='Home'>
        <Box>
          <Box direction='row' gap='xlarge' margin={{ bottom: 'large' }}>
            <Box basis='medium' overflow='hidden'>
              <Heading level={3}>
                <strong>Dashboard</strong>
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box gap='medium'>
          <Grid columns='medium' gap='medium' justify='between'>
            {packages.map((pckg, index) => <NPMStats key={`npm-stats-${pckg.name}`} pckg={pckg} index={index} />)}
          </Grid>
          <Grid columns='medium' gap='medium' justify='between'>
            <DonutChart pName='downloadsCount' title='Downloads' />
            <DonutChart pName='dependentsCount' title='Dependents' />
            <DonutChart pName='communityInterest' title='Interest' />
            <DonutChart pName='downloadsAcceleration' title='Acceleration' />
          </Grid>
        </Box>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ npmRetrieveStats }, dispatch);

const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
