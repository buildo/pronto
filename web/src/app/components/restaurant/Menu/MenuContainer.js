import t from 'tcomb';
import isEqual from 'lodash/isEqual';
import container from 'container';
import Menu from './Menu';
import { Menu as MenuT } from 'model';

const EMPTY = { groups: [], description: '' };

export default container(Menu, {
  connect: { pendingMenu: t.maybe(MenuT) },
  commands: ['doUpdateMenu'],
  queries: ['possiblyEmptyMenu'],
  mapProps: ({ pendingMenu, possiblyEmptyMenu, transition, doUpdateMenu }) => ({
    menu: pendingMenu || possiblyEmptyMenu || EMPTY,
    saveEnabled: !t.Nil.is(pendingMenu) && !isEqual(pendingMenu, possiblyEmptyMenu),
    onChange: pendingMenu => transition({ pendingMenu }),
    onSubmit: () => doUpdateMenu({ menu: pendingMenu }),
    onDiscard: () => transition({ pendingMenu: null })
  })
});