import container from 'container';
import { t } from 'tcomb-react';
import loadingDecorator from 'loading';
import Menu from './Menu';

export default container(Menu, {
  connect: { personItems: t.maybe(t.list(t.String)), personName: t.maybe(t.String) },
  loadingDecorator,
  queries: ['menu'],
  mapProps: ({ personItems = [], menu, transition, personName }) => ({
    menu,
    isStatic: !personName,
    value: personItems,
    onChange: personItems => transition({ personItems })
  })
});
