import 'isomorphic-fetch';
import { Box } from 'grommet';
import SiteLayout from '../components/layouts/SiteLayout';
import ComponentsGroup from '../components/components/ComponentsGroup';


export default class AddOns extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://grommet-nextjs.herokuapp.com/api/examples');
    const allExamples = await res.json();
    return { examples: allExamples };
  }

  render() {
    const { examples } = this.props;
    return (
      <SiteLayout title='components'>
        <Box>
          <ComponentsGroup examples={examples} group='Layout' />
          <ComponentsGroup examples={examples} group='Type' />
          <ComponentsGroup examples={examples} group='Controls' />
          <ComponentsGroup examples={examples} group='Input' />
          <ComponentsGroup examples={examples} group='Visualizations' />
          <ComponentsGroup examples={examples} group='Media' />
        </Box>
      </SiteLayout>
    );
  }
}
