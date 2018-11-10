import 'isomorphic-fetch';
import { Box } from 'grommet';
import { DropInput } from 'grommet-controls';
import { Search } from 'grommet-icons';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';
import ComponentsGroup from '../components/components/ComponentsGroup';


export default class AddOns extends React.Component {
  state = { search: '' };

  static async getInitialProps() {
    const res = await fetch('https://grommet-nextjs.herokuapp.com/api/examples');
    const allExamples = await res.json();
    return { examples: allExamples };
  }

  render() {
    const { examples } = this.props;
    const { search } = this.state;
    const searchRegularized = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').toLowerCase();
    return (
      <SiteLayout title='components'>
        <Title label='Components'>
          <Box direction='row' basis='medium'>
            <DropInput
              style={{
                WebkitAppearance: 'none',
              }}

              value={search}
              type='search'
              onChange={({ target: { value } }) => this.setState({ search: value })}
              widgets={[
                { icon: <Search color='brand' />, onClick: () => {} },
              ]}
            />
          </Box>
        </Title>
        <Box>
          <ComponentsGroup examples={examples} search={searchRegularized} group='Layout' />
          <ComponentsGroup examples={examples} search={searchRegularized} group='Type' />
          <ComponentsGroup examples={examples} search={searchRegularized} group='Navigation' />
          <ComponentsGroup examples={examples} search={searchRegularized} group='Controls' />
          <ComponentsGroup examples={examples} search={searchRegularized} group='Input' />
          <ComponentsGroup examples={examples} search={searchRegularized} group='Validation' />
          <ComponentsGroup examples={examples} search={searchRegularized} group='Visualizations' />
          <ComponentsGroup examples={examples} search={searchRegularized} group='Media' />
        </Box>
      </SiteLayout>
    );
  }
}
