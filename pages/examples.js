/* eslint-disable import/no-duplicates */
import React from 'react';
import { withRouter } from 'next/router';
import 'isomorphic-fetch';
import { Box } from 'grommet';
import { Search } from 'grommet-icons';
import { Sidebar, VerticalMenu, DropInput } from 'grommet-controls';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';
import styled, { css } from 'styled-components';
import * as Icons from 'grommet-icons';
import * as Grommet from 'grommet';
import { Form as GrommetForm, MaskedInput as GrommetMaskedInput } from 'grommet';
import * as Themes from 'grommet-controls/themes';
import * as GrommetControls from 'grommet-controls';
import * as GrommetCharts from 'grommet-controls/chartjs';
import SiteLayout from '../components/layouts/SiteLayout';
import RoutedButton from '../components/RoutedButton';

const scope = {
  ...Grommet,
  GrommetForm,
  GrommetMaskedInput,
  ...GrommetControls,
  ...GrommetCharts,
  Icons,
  Themes,
  styled,
  css,
};

const StyledEditor = styled(LiveEditor)`
  overflow: auto;
`;
class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.selectedExampleToState(props), search: '' };
  }
  selectedExampleToState = (props) => {
    const { group = 'Box', library = 'grommet', example = '_starter' } = props.router.query;
    let code = '';
    const item = props.examples.find(e => e.label === group && e.package === library);
    if (item) {
      const exmpl = item.items.find(e => e.label === example);
      if (exmpl) {
        ({ code } = exmpl);
      }
    }
    return {
      code, group, example, library,
    };
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.router.query.library !== this.state.library ||
      nextProps.router.query.group !== this.state.group ||
      nextProps.router.query.example !== this.state.example) {
      this.setState(this.selectedExampleToState(nextProps));
    }
  }
  static async getInitialProps() {
    const res = await fetch('https://grommet-nextjs.herokuapp.com/api/examples');
    const allExamples = await res.json();
    const examples = allExamples.map(example => ({
      label: example.name,
      package: example.package,
      category: example.category,
      items: Object.keys(example.examples)
        .sort()
        .map(item => ({
          label: item,
          library: example.package,
          component: example.name,
          code: example.examples[item],
          id: `${example.package}_${example.name}_${item}`,
          route: 'examples',
          params: { library: example.package, group: example.name, example: item },

        })),
    }));
    const byPackage = examples.reduce((acc, item) => {
      if (!acc[item.package]) {
        acc[item.package] = [];
      }
      acc[item.package].push(item);
      return acc;
    }, {});
    const grouped = Object.keys(byPackage).map((p) => {
      const byCategory = byPackage[p].reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});
      return {
        label: p,
        items: Object.keys(byCategory).sort().map(cat => ({
          label: cat,
          id: `${p}_${cat}`,
          items: byCategory[cat],
        })),
      };
    });
    return {
      examples,
      grouped,
    };
  }
  render() {
    const { grouped } = this.props;
    const {
      library, group, example, code, search,
    } = this.state;
    return (
      <SiteLayout title='Component editor'>
        <Box direction='row' flex={true}>
          <Sidebar
            title='Examples'
            width='medium'
            flex={false}
            background='brand'
          >
            <Box pad='small'>
              <DropInput
                style={{
                  WebkitAppearance: 'none',
                }}
                placeholder='Search for example'
                value={search}
                type='search'
                onChange={({ target: { value } }) => this.setState({ search: value })}
                widgets={[
                  { icon: <Search />, onClick: () => {} },
                ]}
              />
            </Box>
            <Box overflow='auto'>
              <VerticalMenu
                buttonClass={RoutedButton}
                items={grouped}
                activeItem={{ id: `${library}_${group}_${example}` }}
                search={search}
              />
            </Box>
          </Sidebar>
          <Box fill={true}>
            <LiveProvider
              code={code}
              scope={scope}
              noInline={true}
            >
              <Box direction='row-responsive' fill={true} pad='medium' gap='medium'>
                <Box basis='1/2'>
                  <StyledEditor onChange={e => this.setState({ code: e })} />
                  <LiveError />
                </Box>
                <Box basis='1/2'>
                  <LivePreview />
                </Box>
              </Box>
            </LiveProvider>
          </Box>

        </Box>
      </SiteLayout>
    );
  }
}

export default withRouter(Examples);
