import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';

// eslint-disable-next-line import/prefer-default-export
const Sidebar = ({
  title, width, children, ...rest
}) => (
  <Box width={width}>
    {title && (
      <Box
        flex={false}
        tag='header'
        pad={{ horizontal: 'small' }}
        {...rest}
      >
        <Heading margin='none' level={3}>{title}</Heading>
      </Box>
    )}
    {children}
  </Box>
);

Sidebar.defaultProps = {
  title: undefined,
  width: 'medium',
};

Sidebar.propTypes = {
  title: PropTypes.node,
  width: PropTypes.string,
};

export default Sidebar;
