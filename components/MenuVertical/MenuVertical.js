import React, { Component } from 'react';
import { Box, Keyboard, Text } from 'grommet';
import { FormDown, FormNext } from 'grommet-icons';
import RoutedButton from '../RoutedButton';

const getExpandedItems = children =>
  children.reduce((expandedItems, item) => {
    const {
      items, expanded, id, label,
    } = item;
    if (expanded) {
      expandedItems.push(id || label);
    }
    let childrenExpandedItems = [];
    if (items) {
      childrenExpandedItems = getExpandedItems(items);
    }
    return expandedItems.concat(childrenExpandedItems);
  }, []);

const getCollapsibleItems = children =>
  children.reduce((collapsibleItems, { items, id, label }) => {
    let childrenCollapsibleItems = [];
    if (items) {
      collapsibleItems.push(id || label);

      childrenCollapsibleItems = getCollapsibleItems(items);
    }
    return collapsibleItems.concat(childrenCollapsibleItems);
  }, []);

const getFlatChildrenIds = children =>
  children.reduce((flatChildren, item) => {
    flatChildren.push(item.id || item.label);
    if (item.items) {
      // eslint-disable-next-line no-param-reassign
      flatChildren = flatChildren.concat(getFlatChildrenIds(item.items));
    }
    return flatChildren;
  }, []);

const getChildrenById = (children, id) => {
  let items;
  children.some((item) => {
    if (item.id === id || item.label === id) {
      ({ items } = item);
      return true;
    }
    if (item.items) {
      items = getChildrenById(item.items, id);

      if (items) {
        return true;
      }
    }
    return false;
  });
  return items;
};

export default class MenuVertical extends Component {
  state = { expandedItems: [] };
  buttonRefs = {};
  static getDerivedStateFromProps(nextProps, prevState = {}) {
    const { items, expandAll } = nextProps;
    const { originalExpandAll, items: stateItems = [] } = prevState;

    if (
      items.toString() !== stateItems.toString() ||
      expandAll !== originalExpandAll
    ) {
      const collapsibleItems = getCollapsibleItems(items);
      let expandedItems;
      if (typeof expandAll !== 'undefined') {
        expandedItems = expandAll ? collapsibleItems : [];
      } else {
        expandedItems = getExpandedItems(items);
      }

      const allExpanded =
        typeof expandAll !== 'undefined'
          ? expandAll
          : collapsibleItems.length === expandedItems.length;
      return {
        expandedItems,
        items,
        collapsibleItems,
        allExpanded,
        expandAll,
        originalExpandAll: expandAll,
      };
    }

    return null;
  }
  onMenuChange = (id, expanded) => {
    const { items } = this.props;
    const { expandedItems } = this.state;

    let newExpandedItems = [...expandedItems];
    if (expanded) {
      const toBeCollapsed = [
        id,
        ...getFlatChildrenIds(getChildrenById(items, id)),
      ];
      newExpandedItems = newExpandedItems.filter(
        item => toBeCollapsed.indexOf(item) < 0
      );
    } else {
      newExpandedItems.push(id);
    }

    this.setState({
      expandedItems: newExpandedItems,
    });
  };
  renderItem = (item, level = 1) => {
    const { activeItem, onSelect } = this.props;
    const { expandedItems } = this.state;
    const {
      items, id, label, widget, icon, ...rest
    } = item;
    const itemId = id || label;
    const isExpanded = expandedItems.includes(itemId);

    const itemKey = `item_${itemId}_${level}`;

    let background;
    if (activeItem && activeItem.id === id) {
      background = 'focus';
    }

    const content = (
      <Box
        background={background}
      >
        <RoutedButton
          ref={(ref) => { this.buttonRefs[id] = ref; }}
          onClick={(!rest.route && !rest.path) ? () =>
            (items ? this.onMenuChange(itemId, isExpanded) : (onSelect && onSelect(item)))
            : undefined
          }
          hoverIndicator={{ color: 'active' }}
          {...rest}
        >
          <Box
            direction='row'
            align='center'
            pad='small'
            style={{
              marginLeft: items ? `${12 * level}px` : `${16 * level}px`,
            }}
          >
            {items &&
              (isExpanded ? <FormDown /> : <FormNext />)}
            <Box direction='row' justify='between' fill='horizontal' align='center'>
              <Box direction='row' align='center' gap='small'>
                {icon}
                <Text>
                  {items ? <strong>{label}</strong> : label}
                </Text>
              </Box>
              {widget}
            </Box>
          </Box>
        </RoutedButton>
      </Box>
    );
    return (
      <Box key={itemKey}>
        {items ? (
          <Keyboard
            onDown={() => this.onMenuChange(itemId, false, false)}
            onRight={() => this.onMenuChange(itemId, false)}
            onUp={() => this.onMenuChange(itemId, true)}
            onLeft={() => this.onMenuChange(itemId, true)}
          >
            {content}
          </Keyboard>
        ) : (
          content
        )}
        {items &&
          (isExpanded && items.map(child => this.renderItem(child, level + 1)))}
      </Box>
    );
  };
  render() {
    const { items } = this.props;
    return (
      <React.Fragment>
        {items && items.map(item => this.renderItem(item, 1))}
      </React.Fragment>
    );
  }
}
