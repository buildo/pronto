import container from 'container';
import t from 'tcomb';
import PersonOrder from './PersonOrder';

export default container(PersonOrder, {
  connect: { personItems: t.maybe(t.list(t.String)), personId: t.maybe(t.String) },
  commands: ['doAddPersonToOrder'],
  mapProps: ({ personItems = [], personId, transition, doAddPersonToOrder }) => ({
    personItems,
    personId,
    onCancel: () => transition({ view: 'order', personId: null, personItems: null }),
    onConfirm: doAddPersonToOrder
  })
});
