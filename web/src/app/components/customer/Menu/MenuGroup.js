import React from 'react';
import includes from 'lodash/includes';
import find from 'lodash/find';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { MenuItem as MenuItemModel } from 'model';
import FlexView from 'FlexView';
import MenuItem from './MenuItem';

@pure
@skinnable()
@props({
  description: t.String,
  items: t.list(MenuItemModel),
  personItems: t.maybe(t.list(t.String)),
  onChange: t.maybe(t.Function)
})
export default class MenuGroup extends React.Component {

  toggleMenuItem = menuItemName => () => {
    const { personItems, items: menuItems, onChange } = this.props;

    if (includes(personItems, menuItemName)) {
      onChange({ toRemove: menuItemName });
    } else {
      const menuItemNames = menuItems.map(menuItem => menuItem.name);
      const toRemove = find(personItems, pItem => includes(menuItemNames, pItem));

      // enforce radio selection
      onChange({ toRemove, toAdd: menuItemName });
    }
  }

  getLocals() {
    const {
      toggleMenuItem,
      props: { description, items, personItems, onChange }
    } = this;

    return {
      description,
      personItems,
      toggleMenuItem: onChange ? toggleMenuItem : undefined,
      menuItems: items
    };
  }

  templateMenuItems = ({ menuItems, toggleMenuItem, personItems }) => menuItems.map(menuItem => (
    <MenuItem
      {...menuItem}
      onClick={toggleMenuItem ? toggleMenuItem(menuItem.name) : undefined}
      selected={includes(personItems, menuItem.name)}
      key={menuItem.name}
    />
  ))

  template({ description, ...locals }) {
    return (
      <FlexView className='menu-group' column>
        <div className='group-name'>{description}</div>
        <FlexView className='menu-items' column>
          {this.templateMenuItems(locals)}
        </FlexView>
      </FlexView>
    );
  }

}
