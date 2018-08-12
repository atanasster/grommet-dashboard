import React from 'react';
import { Box, Heading, Grid, InfiniteScroll, Text } from 'grommet';
import { DropInput } from 'grommet-controls';
import * as Icons from 'grommet-icons';
import metadata from 'grommet-icons/metadata';
import Page from '../components/Page';

const iconKeys = Object.keys(Icons).filter(icon =>
  Icons[icon] && icon !== 'default' && icon !== 'ThemeContext' &&
  Icons[icon] !== true);

export default class IconsPage extends React.Component {
  state = { search: '' };

  render() {
    const { small } = this.props;
    const { search } = this.state;
    const icons = iconKeys
      .filter(icon => (
        icon.toLowerCase().match(search.toLowerCase()) ||
        (metadata[icon] || []).some(synonym =>
          synonym.substr(0, search.length).toLowerCase() === search.toLowerCase())
      ))
      .map(icon => ({
        name: icon,
        Icon: Icons[icon],
        label: search ? icon.replace(
          new RegExp(search, 'ig'),
          text => (text ? `<strong>${text}</strong>` : '')
        ) : icon,
      }));
    return (
      <Page title='Icons'>
        <Box direction='row' justify='between' margin={{ bottom: 'large' }} align='center'>
          <Heading level={3}>
            <strong>Icons</strong>
          </Heading>
          <Box direction='row' basis='medium'>
            <DropInput
              value={search}
              type='search'
              onChange={({ target: { value } }) => this.setState({ search: value })}
              widgets={[
                { icon: <Icons.Search color='brand' />, onClick: () => {} },
              ]}
            />
          </Box>

        </Box>
        <Box pad={{ horizontal: 'large' }} >
          <Grid columns='small'>
            {icons.length > 0 ? (
              <InfiniteScroll items={icons}>
                {({ label, Icon, name }) => (
                  <Box
                    basis={small ? 'xsmall' : 'small'}
                    justify='start'
                    align='center'
                    pad={{ vertical: 'small' }}
                    key={name}
                    style={{ minHeight: small ? '162px' : '144px' }}
                  >
                    <Icon size='large' color='plain' />
                    <Text
                      textAlign='center'
                      margin='small'
                      style={{ wordBreak: 'break-all' }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: label }} />
                    </Text>
                  </Box>
                  )}
              </InfiniteScroll>
              ) : null}
          </Grid>
        </Box>
      </Page>
    );
  }
}
