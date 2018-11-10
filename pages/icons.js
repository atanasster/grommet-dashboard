import React from 'react';
import { Box, Grid, InfiniteScroll, Text } from 'grommet';
import { DropInput } from 'grommet-controls';
import * as Icons from 'grommet-icons';
import metadata from 'grommet-icons/metadata';
import SiteLayout from '../components/layouts/SiteLayout';
import Title from '../components/layouts/Title';

const iconKeys = Object.keys(Icons).filter(icon =>
  Icons[icon] && icon !== 'default' && icon !== 'ThemeContext' && icon !== 'Icon' && icon !== 'base' &&
  Icons[icon] !== true);

export default class IconsPage extends React.Component {
  state = { search: '' };

  render() {
    const { small } = this.props;
    const { search } = this.state;
    const searchRegularized = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').toLowerCase();
    const icons = iconKeys
      .filter(icon => (
        icon.toLowerCase().match(searchRegularized) ||
        (metadata[icon] || []).some(synonym =>
          synonym.substr(0, search.length).toLowerCase() === search.toLowerCase())
      ))
      .sort()
      .map(icon => ({
        name: icon,
        Icon: Icons[icon],
        label: search ? icon.replace(
          new RegExp(search, 'ig'),
          text => (text ? `<strong>${text}</strong>` : '')
        ) : icon,
      }));
    return (
      <SiteLayout title='Icons'>
        <Title label='Icons'>
          <Box direction='row' basis='medium'>
            <DropInput
              style={{
                WebkitAppearance: 'none',
              }}

              value={search}
              type='search'
              onChange={({ target: { value } }) => this.setState({ search: value })}
              widgets={[
                { icon: <Icons.Search color='brand' />, onClick: () => {} },
              ]}
            />
          </Box>
        </Title>
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
      </SiteLayout>
    );
  }
}
