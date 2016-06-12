import t from 'tcomb';
import isEqual from 'lodash/isEqual';
import container from 'container';
import Menu from './Menu';
import { Menu as MenuT } from 'model';

const EMPTY = { groups: [] };

export default container(Menu, {
  connect: { pendingMenu: t.maybe(MenuT) },
  commands: ['doUpdateMenu'],
  queries: ['menu'],
  mapProps: ({ pendingMenu, menu, transition, doUpdateMenu }) => ({
    menu: pendingMenu || menu || EMPTY,
    saveEnabled: !t.Nil.is(pendingMenu) && !isEqual(pendingMenu, menu),
    onChange: pendingMenu => transition({ pendingMenu }),
    onSubmit: () => doUpdateMenu({ menu: pendingMenu }),
    onDiscard: () => transition({ pendingMenu: null })
  })
});