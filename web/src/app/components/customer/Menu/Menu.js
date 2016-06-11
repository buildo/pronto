import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import { Menu as MenuModel } from 'model';
import ComposableMenu from './ComposableMenu';
import StaticMenu from './StaticMenu';

import './menu.scss';

@pure
@skinnable()
@props({
  value: t.list(t.String), // Person.items
  onChange: t.Function,
  menu: MenuModel,
  isStatic: t.Boolean
})
export default class Menu extends React.Component {

  getLocals({ isStatic, menu, ...props }) {
    return {
      isStatic,
      staticMenuProps: isStatic && {
        menu
      },
      composableMenuProps: !isStatic && {
        menu,
        ...props
      }
    };
  }

  template({ isStatic, staticMenuProps, composableMenuProps }) {
    return (
      isStatic ?
        <StaticMenu {...staticMenuProps} /> :
        <ComposableMenu {...composableMenuProps} />
    );
  }

}
