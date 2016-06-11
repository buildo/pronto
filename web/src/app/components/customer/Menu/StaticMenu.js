import React from 'react';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Menu as MenuType } from 'model';
import MenuGroup from './MenuGroup';

import '../Menu/menu.scss';

@skinnable()
@props({
  menu: MenuType
})
export default class StaticMenu extends React.Component {

  template({ menu }) {
    return (
      <FlexView className='static-menu' column shrink={false}>
        <h2>{menu.description}</h2>
        <FlexView className='menu-groups' hAlignContent='center' column>
          {menu.groups.map((menuGroup, i) => <MenuGroup {...menuGroup} key={i} />)}
        </FlexView>
      </FlexView>
    );
  }
}
