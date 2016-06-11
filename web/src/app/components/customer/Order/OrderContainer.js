import container from 'container';
import Order from './Order';

export default container(Order, {
  connect: { },
  commands: ['doAddPersonToOrder', 'doDeletePersonFromOrder'],
  queries: ['order'],
  mapProps: ({ transition, doAddPersonToOrder, doDeletePersonFromOrder, order }) => ({
    order,
    onAddPersonClick: (personId) => doAddPersonToOrder(personId),
    onPersonClick: (personId) => () => {
      transition({ view: 'personOrder', personId });
    },
    onDeletePersonClick: (personId) => doDeletePersonFromOrder(personId)
  })
});
