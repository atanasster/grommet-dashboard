import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph } from 'grommet';
import { withTheme } from 'grommet/components/hocs';
import { Tags } from 'grommet-controls';
import TextInput from './TextInput/TextInput';
import { npmUpdateSearch, npmSearchRequest, npmClearSearch, npmSetPackages } from '../redux/npm/actions';
import connect from '../redux';
import { colorFromIndex } from '../utils/colors';

class PackageSelector extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.packages = undefined;
    this.updatePackages(props);
  }

  updatePackages = (props) => {
    if (props.router.query.packages !== this.packages) {
      let { packages } = props.router.query;
      if (packages) {
        packages = packages.split(',');
      }
      this.props.npmSetPackages(packages);
      this.packages = props.router.query.packages;
    }
  };

  componentWillReceiveProps(nextProps) {
    this.updatePackages(nextProps);
  }
  onSearch = ({ target }) => {
    this.props.npmUpdateSearch(target.value);
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.props.npmSearchRequest(target.value);
    }, 600);
  };

  onSelect = ({ suggestion }) => {
    const { onChange, packages, router } = this.props;
    const selected = suggestion.value;
    this.props.npmClearSearch();
    const packagesPath = [...packages.map(p => p.name), selected].join(',');
    const path = { pathname: router.pathname, query: { ...router.query, packages: packagesPath } };
    router.replace(path, path, { shallow: true });

    if (onChange) {
      onChange(selected);
    }
  };
  onRemovePackage = (selected) => {
    const { packages, router } = this.props;
    const packagesPath = packages.filter(p => p.name !== selected.label)
      .map(p => p.name)
      .join(',');
    const path = { pathname: router.pathname, query: { ...router.query, packages: packagesPath } };
    router.replace(path, path, { shallow: true });
  };

  createSuggestions = () => {
    const { searchResults } = this.props;
    const suggestions = [];
    if (searchResults) {
      searchResults.forEach((p) => {
        suggestions.push({
          label: (
            <Box fill='horizontal'>
              <Box direction='row' justify='between'>
                <Text><strong>{p.package.name}</strong></Text>
                <Box>
                  <Text size='small'>
                    {p.package.author && p.package.author.name}
                  </Text>
                  <Text size='small'>
                    {p.package.version}
                  </Text>
                </Box>
              </Box>
              <Paragraph size='small' margin='none'>
                {p.package.description}
              </Paragraph>
            </Box>
          ),
          value: p.package.name,
        });
      });
    }
    return suggestions;
  };

  render() {
    const { packages, search } = this.props;
    let tags = [];
    if (packages) {
      tags = packages.map((p, i) =>
        ({ label: p.name, background: colorFromIndex(i) }));
    }
    return (
      <Box gap='medium'>
        <Box direction='row'>
          <Box basis='medium'>
            <TextInput
              value={search}
              placeholder='search'
              suggestions={this.createSuggestions()}
              onChange={this.onSearch}
              onSelect={this.onSelect}
            />
          </Box>
        </Box>
        <Tags
          pad={{ vertical: 'small' }}
          placeholder='Search for an NPM package above'
          value={tags}
          onChange={({ option }) => this.onRemovePackage(option)}
          tagProps={{ size: 'large', pad: 'small' }}
        />
      </Box>
    );
  }
}

PackageSelector.defaultProps = {
  onChange: undefined,
};

PackageSelector.propTypes = {
  onChange: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    npmUpdateSearch,
    npmClearSearch,
    npmSearchRequest,
    npmSetPackages,
  }, dispatch);

const mapStateToProps = state => ({
  searchResults: state.npm.searchResults,
  packages: state.npm.packages,
  search: state.npm.search,
});


export default withRouter(withTheme(connect(mapStateToProps, mapDispatchToProps)(PackageSelector)));

