import container from 'container';
import Order from './Order';

export default container(Order, {
  connect: { },
  commands: ['doDeletePersonFromOrder'],
  queries: ['order'],
  mapProps: ({ transition, doDeletePersonFromOrder, order }) => ({
    order,
    onAddPersonClick: (personId) => transition({ view: 'personOrder', personId }),
    onPersonClick: (personId) => () => {
      transition({ view: 'personOrder', personId });
    },
    onDeletePersonClick: (personId) => doDeletePersonFromOrder(personId)
  })
});
