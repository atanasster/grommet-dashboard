import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import 'isomorphic-unfetch';
import { Box, Text, Paragraph, TextInput } from 'grommet';
import { Tags } from 'grommet-controls';
import { colorFromIndex } from 'grommet-controls/utils';
import PackageAnchor from './PackageAnchor';
import { npmSetPackages } from '../../redux/npm/actions';
import connect from '../../redux/index';


class PackageSelector extends React.Component {
  state = {
    search: '',
    showDrop: undefined,
    searchResults: undefined,
  }
  constructor(props, context) {
    super(props, context);
    this.packages = undefined;
    this.updatePackages(props);
  }

  updatePackages = (props) => {
    if (props.router.query.packages !== this.packages) {
      let { packages } = props.router.query;
      if (typeof packages === 'string') {
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
    this.setState({ search: target.value, showDrop: undefined });
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (target.value) {
      this.timeout = setTimeout(() => {
        fetch(`https://api.npms.io/v2/search?q=${target.value}`)
          .then(response => response.json())
          .then((data) => {
            this.setState({ searchResults: data.results, showDrop: true });
          });
      }, 100);
    } else {
      this.setState({ searchResults: undefined, showDrop: true });
    }
  };

  onSelect = ({ suggestion }) => {
    const { onChange, packages, router } = this.props;
    if (!packages.find(p => p === suggestion.value)) {
      const selected = suggestion.value;
      this.setState({ search: '', searchResults: undefined });
      const packagesPath = [...packages, selected].join(',');
      const path = {
        pathname: router.pathname,
        query: { ...router.query, packages: packagesPath },
      };
      router.replace(path, path, { shallow: true });
      if (onChange) {
        onChange(selected);
      }
    }
  };
  onRemovePackage = (selected) => {
    const { packages, router } = this.props;
    const packagesPath = packages.filter(p => p !== selected.package)
      .join(',');
    const path = { pathname: router.pathname, query: { ...router.query, packages: packagesPath } };
    router.replace(path, path, { shallow: true });
  };

  createSuggestions = () => {
    const { searchResults } = this.state;
    const suggestions = [];
    if (searchResults) {
      searchResults.forEach((p) => {
        suggestions.push({
          label: (
            <Box fill='horizontal' pad='xsmall'>
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
    const { packages } = this.props;
    const { search, showDrop } = this.state;
    let tags = [];
    if (packages) {
      tags = packages.map((p, i) =>
        ({
          label: (<PackageAnchor packageName={p}>{p}</PackageAnchor>),
          package: p,
          background: colorFromIndex(i),
        }));
    }
    return (
      <Box gap='medium'>
        <Box direction='row'>
          <Box basis='medium'>
            <TextInput
              value={search}
              showDrop={showDrop}
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
    npmSetPackages,
  }, dispatch);

const mapStateToProps = state => ({
  packages: state.npm.packages,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackageSelector));

