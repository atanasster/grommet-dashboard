import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import SideBar from '../Sidebar/SideBar';
import MenuVertical from '../MenuVertical/MenuVertical';

const SideMenu = ({
  title, items, onSelect, activeItem, children, ...rest
}) => (
  <SideBar
    title={title}
    {...rest}
  >
    <Box overflow='auto'>
      <MenuVertical
        items={items}
        activeItem={activeItem}
        onSelect={onSelect}
      />
    </Box>
    {children}
  </SideBar>
);

SideMenu.defaultProps = {
  title: undefined,
  onSelect: undefined,
};

SideMenu.propTypes = {
  title: PropTypes.node,
  onSelect: PropTypes.func,
  items: PropTypes.array.isRequired,
};

export default SideMenu;
