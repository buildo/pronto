import container from 'container';
import Order from './Order';
import loadingDecorator from 'noLoading';

export default container(Order, {
  connect: { },
  commands: ['doDeletePersonFromOrder', 'doConfirmOrder', 'doRefreshOrder'],
  queries: ['order', 'restaurant'],
  loadingDecorator,
  mapProps: ({
    transition, doDeletePersonFromOrder, order, doConfirmOrder, restaurant,
    doRefreshOrder: refresh
  }) => ({
    order,
    onAddPersonClick: (personId) => transition({ view: 'personOrder', personId }),
    onPersonClick: (personId) => transition({ view: 'personOrder', personId }),
    onDeletePersonClick: personId => doDeletePersonFromOrder({ personId }),
    onConfirmOrder: doConfirmOrder,
    maxPeopleNumber: restaurant.maxPeopleNumber,
    refresh
  })
});
