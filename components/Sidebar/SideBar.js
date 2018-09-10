import React, { Component } from 'react';
import { Box, Heading } from 'grommet';
import MenuVertical from '../MenuVertical/MenuVertical';

// eslint-disable-next-line import/prefer-default-export
export class Sidebar extends Component {
  render() {
    const { children, title, items } = this.props;
    return (
      <Box direction='row'>
        <Box width='medium'>
          <Box
            flex={false}
            tag='header'
            pad={{ horizontal: 'small' }}
          >
            <Heading margin='none' level={3}>{title}</Heading>
          </Box>
          <Box flex={true} overflow='auto'>
            <Box flex={false}>
              <MenuVertical
                items={items}
              />
            </Box>
          </Box>
        </Box>
        {children}
      </Box>
    );
  }
}
