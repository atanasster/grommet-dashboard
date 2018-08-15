import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph, TextInput } from 'grommet';
import { Tags } from 'grommet-controls';
import { withTheme } from 'grommet/components/hocs';
import { npmSearchRequest } from '../redux/npm/actions';
import connect from '../redux';

class SearchInput extends React.Component {
  onSearch = ({ target }) => {
    const { npmSearchRequest: search } = this.props;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      search(target.value);
    }, 600);
  };

  onSelect = ({ suggestion }) => {
    const { onChange } = this.props;
    const selected = suggestion.value;
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
    const { packages } = this.props;
    return (
      <Box>
        <TextInput
          defaultValue=''
          placeholder='search'
          suggestions={this.createSuggestions()}
          onChange={this.onSearch}
          onSelect={this.onSelect}
        />
        <Tags value={packages.map(p => p.name)} size='large' />
      </Box>
    );
  }
}

SearchInput.defaultProps = {
  onChange: undefined,
};

SearchInput.propTypes = {
  onChange: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ npmSearchRequest }, dispatch);

const mapStateToProps = state => ({
  searchResults: state.npm.searchResults,
  packages: state.npm.packages,
});


export default withTheme(connect(mapStateToProps, mapDispatchToProps)(SearchInput));

