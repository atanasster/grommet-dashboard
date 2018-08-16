import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph } from 'grommet';
import { Tags } from 'grommet-controls';
import { withTheme } from 'grommet/components/hocs';
import TextInput from './TextInput/TextInput';
import { npmUpdateSearch, npmSearchRequest, npmClearSearch, npmRemovePackage, npmAddPackage } from '../redux/npm/actions';
import connect from '../redux';

class PackageSelector extends React.Component {
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
    const { onChange } = this.props;
    const selected = suggestion.value;
    this.props.npmClearSearch();
    this.props.npmAddPackage(selected);
    if (onChange) {
      onChange(selected);
    }
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
          value={packages.map(p => p.name)}
          onChange={({ option }) => this.props.npmRemovePackage(option)}
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
    npmUpdateSearch, npmClearSearch, npmRemovePackage, npmAddPackage, npmSearchRequest,
  }, dispatch);

const mapStateToProps = state => ({
  searchResults: state.npm.searchResults,
  packages: state.npm.packages,
  search: state.npm.search,
});


export default withTheme(connect(mapStateToProps, mapDispatchToProps)(PackageSelector));

