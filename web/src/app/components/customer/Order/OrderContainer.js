import container from 'container';
import Order from './Order';

export default container(Order, {
  connect: { },
  commands: ['doDeletePersonFromOrder', 'doConfirmOrder'],
  queries: ['order', 'restaurant'],
  mapProps: ({ transition, doDeletePersonFromOrder, order, doConfirmOrder, restaurant }) => ({
    order,
    onAddPersonClick: (personId) => transition({ view: 'personOrder', personId }),
    onPersonClick: (personId) => transition({ view: 'personOrder', personId }),
    onDeletePersonClick: personId => doDeletePersonFromOrder({ personId }),
    onConfirmOrder: doConfirmOrder,
    maxPeopleNumber: restaurant.maxPeopleNumber
  })
});
