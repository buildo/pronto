import React from 'react';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Menu as MenuType } from 'model';

import './staticMenu.scss';

@skinnable()
@props({
  menu: MenuType
})
export default class StaticMenu extends React.Component {

  templateMenuGroupItem = (item, key) => (
    <FlexView className='item' key={key} column>
      <h4>{item.name}</h4>
      <div>{item.description}</div>
    </FlexView>
  )

  templateMenuGroup = (group, key) => (
    <FlexView className='group' key={key} column>
      <h3>{group.name}</h3>
      <FlexView className='items' column>
        {group.items.map(this.templateMenuGroupItem)}
      </FlexView>
    </FlexView>
  )

  template({ menu }) {
    return (
      <FlexView className='menu' column>
        <h2>{menu.description}</h2>
        <FlexView className='groups' hAlignContent='center' column>
        {menu.groups.map(this.templateMenuGroup)}
        </FlexView>
      </FlexView>
    );
  }
}
