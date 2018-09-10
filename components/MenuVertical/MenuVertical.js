import React, { Component, Fragment } from 'react';
import { Anchor, Box, Button, Keyboard, Text } from 'grommet';
import { FormDown, FormNext } from 'grommet-icons';

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
  static getDerivedStateFromProps(nextProps, prevState = {}) {
    const { items, expandAll } = nextProps;
    const { originalExpandAll, items: stateItems = [] } = prevState;

    if (items !== undefined &&
      (items.toString() !== stateItems.toString() ||
      expandAll !== originalExpandAll)
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
  state = {};
  buttonRefs = {};
  onMenuChange = (id, expanded) => {
    const { items } = this.props;
    const { collapsibleItems, expandedItems } = this.state;

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
      expandAll: undefined,
      allExpanded: collapsibleItems.length === newExpandedItems.length,
    });
  };
  renderItem = (item, level = 1) => {
    const { activeItem, onSelect } = this.props;
    const { expandAll, expandedItems } = this.state;
    const { items, id, label } = item;
    const itemId = id || label;
    const isExpanded = expandedItems.includes(itemId);
    const open = typeof expandAll !== 'undefined' ? expandAll : isExpanded;

    const itemKey = `item_${itemId}_${level}`;

    let activeStyle;
    if (activeItem && activeItem.id === id) {
      activeStyle = {
        background: 'rgba(61,19,141,0.1)',
      };
    }

    const content = (
      <Button
        style={activeStyle}
        ref={(ref) => { this.buttonRefs[id] = ref; }}
        onClick={() =>
          (items ? this.onMenuChange(itemId, open) : onSelect(item))
        }
        hoverIndicator={{ color: 'neutral-1', opacity: 'weak' }}
      >
        <Box
          direction='row'
          align='center'
          pad='xsmall'
          style={{
            marginLeft: items ? `${12 * level}px` : `${16 * level}px`,
          }}
        >
          {items &&
            (open ? <FormDown /> : <FormNext />)}
          <Text size='small'>
            {items ? <strong>{label}</strong> : label}
          </Text>
        </Box>
      </Button>
    );
    return (
      <Fragment key={itemKey}>
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
          (open && items.map(child => this.renderItem(child, level + 1)))}
      </Fragment>
    );
  };
  render() {
    const { items } = this.props;
    const { allExpanded } = this.state;
    return (
      <Fragment>
        <Box pad={{ horizontal: 'small' }} align='end'>
          <Anchor
            href='#'
            onClick={(event) => {
              event.preventDefault();
              this.setState({
                expandAll: !allExpanded,
                allExpanded: !allExpanded,
                expandedItems: (
                  allExpanded || !Array.isArray(items)) ? []
                  : items.map(({ id, label }) => (id || label)),
              });
            }}
          >
            <Text color='brand' size='small'>
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </Text>
          </Anchor>
        </Box>
        {items && items.map(item => this.renderItem(item, 1))}
      </Fragment>
    );
  }
}
