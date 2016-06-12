import container from 'container';
import Order from './Order';

export default container(Order, {
  connect: { },
  commands: ['doDeletePersonFromOrder', 'doConfirmOrder'],
  queries: ['order'],
  mapProps: ({ transition, doDeletePersonFromOrder, order, doConfirmOrder }) => ({
    order,
    onAddPersonClick: (personId) => transition({ view: 'personOrder', personId }),
    onPersonClick: (personId) => transition({ view: 'personOrder', personId }),
    onDeletePersonClick: doDeletePersonFromOrder,
    onConfirmOrder: doConfirmOrder
  })
});
