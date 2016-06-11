import React from 'react';
import includes from 'lodash/includes';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { MenuItem as MenuItemModel } from 'model';
import FlexView from 'FlexView';
import MenuItem from './MenuItem';

@pure
@skinnable()
@props({
  name: t.String,
  items: t.list(MenuItemModel),
  personItems: t.maybe(t.list(t.String)),
  onChange: t.maybe(t.Function)
})
export default class MenuGroup extends React.Component {

  getLocals() {
    const { name, items, personItems, onChange } = this.props;

    return {
      name,
      personItems,
      menuItems: items,
      toggleMenuItem: onChange
    };
  }

  templateMenuItems = ({ menuItems, toggleMenuItem, personItems }) => menuItems.map(menuItem => (
    <MenuItem
      {...menuItem}
      onClick={toggleMenuItem ? () => toggleMenuItem(menuItem.name) : undefined}
      selected={includes(personItems, menuItem.name)}
      key={menuItem.name}
    />
  ))

  template({ name, ...locals }) {
    return (
      <FlexView className='menu-group' column>
        <h3>{name}</h3>
        <FlexView className='menu-items' column>
          {this.templateMenuItems(locals)}
        </FlexView>
      </FlexView>
    );
  }

}
