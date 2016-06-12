import container from 'container';
import { t } from 'tcomb-react';
import loadingDecorator from 'loading';
import Menu from './Menu';
import { OrderStatus } from 'model';

export default container(Menu, {
  connect: { personItems: t.maybe(t.list(t.String)), personId: t.maybe(t.String) },
  loadingDecorator,
  queries: ['menu', 'maybeOrder'],
  mapProps: ({ personItems = [], menu, transition, personId, maybeOrder }) => ({
    menu,
    isStatic: !personId,
    value: personItems,
    onChange: personItems => transition({ personItems }),
    hide: maybeOrder && maybeOrder.status === OrderStatus('submitted')
  })
});
