import container from 'container';
import t from 'tcomb';
import PersonOrder from './PersonOrder';

export default container(PersonOrder, {
  connect: { personItems: t.maybe(t.list(t.String)), personId: t.maybe(t.String) },
  commands: ['doAddPersonToOrder'],
  queries: ['order'],
  mapProps: ({ personItems = [], personId, transition, doAddPersonToOrder, order }) => ({
    personItems,
    personId,
    onCancel: () => transition({ view: 'order', personItems: null }),
    onConfirm: () => {
      return doAddPersonToOrder({ order })
        .then(() => transition({ view: 'order', personItems: null }));
    }
  })
});
