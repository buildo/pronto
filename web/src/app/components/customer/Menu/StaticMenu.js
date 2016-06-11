import React from 'react';
import { props } from 'tcomb-react';
import { skinnable } from 'revenge';
import { FlexView } from 'Basic';
import { Menu as MenuType } from 'model';
import MenuGroup from './MenuGroup';
import MenuDescription from './MenuDescription';

import '../Menu/menu.scss';

@skinnable()
@props({
  menu: MenuType
})
export default class StaticMenu extends React.Component {

  template({ menu: { groups, description } }) {
    return (
      <FlexView className='static-menu' column shrink={false}>
        <div className='menu-title'>MENU</div>
        {description && <MenuDescription description={description} />}
        <FlexView className='menu-groups' hAlignContent='center' column>
          {groups.map((menuGroup, i) => <MenuGroup {...menuGroup} key={i} />)}
        </FlexView>
      </FlexView>
    );
  }
}
