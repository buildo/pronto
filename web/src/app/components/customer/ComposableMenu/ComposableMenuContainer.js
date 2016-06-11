import container from 'container';
import { t } from 'tcomb-react';
import loadingDecorator from 'loading';
import ComposableMenu from './ComposableMenu';

export default container(ComposableMenu, {
  connect: { personItems: t.maybe(t.list(t.String)) },
  loadingDecorator,
  queries: ['menu'],
  mapProps: ({ personItems, menu, transition }) => ({
    menu,
    value: personItems,
    onChange: personItems => transition({ personItems })
  })
});
