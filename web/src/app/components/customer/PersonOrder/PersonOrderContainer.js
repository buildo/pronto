import container from 'container';
import t from 'tcomb';
import PersonOrder from './PersonOrder';
import loadingDecorator from 'noLoading';

export default container(PersonOrder, {
  connect: { personItems: t.maybe(t.list(t.String)), personId: t.maybe(t.String) },
  commands: ['doAddPersonToOrder', 'doRefreshOrder'],
  queries: ['order'],
  loadingDecorator,
  mapProps: ({
    personItems = [], personId, transition, doAddPersonToOrder, order, doRefreshOrder: refresh
  }) => ({
    personItems,
    personId,
    onCancel: () => transition({ view: 'order', personItems: null }),
    onConfirm: () => {
      return doAddPersonToOrder({ order })
        .then(() => transition({ view: 'order', personItems: null }));
    },
    refresh
  })
});
