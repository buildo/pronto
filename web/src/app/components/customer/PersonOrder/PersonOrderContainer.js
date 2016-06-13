import container from 'container';
import t from 'tcomb';
import find from 'lodash/find';
import PersonOrder from './PersonOrder';
import loadingDecorator from 'noLoading';
import { OrderStatus } from 'model';

const initPersonItems = ({ transition, peopleOrders, personId }) => () => {
  const person = find(peopleOrders, { name: personId });
  person && transition({ personItems: person.items });
};

export default container(PersonOrder, {
  connect: { personItems: t.maybe(t.list(t.String)), personId: t.maybe(t.String) },
  commands: ['doAddPersonToOrder', 'doRefreshOrder'],
  queries: ['order'],
  loadingDecorator,
  mapProps: ({
    personItems = [], personId, transition, doAddPersonToOrder, order, doRefreshOrder: refresh
  }) => {
    const orderSubmitted = order.status === OrderStatus('submitted');
    if (orderSubmitted) {
      transition({ view: 'order' });
    }
    const personIdLowerCase = (personId || '').toLowerCase();

    return {
      personItems,
      initPersonItems: initPersonItems({
        transition,
        peopleOrders: order.peopleOrders,
        personId: personIdLowerCase
      }),
      personId: personIdLowerCase,
      onCancel: () => transition({ view: 'order', personItems: null }),
      onConfirm: () => {
        return doAddPersonToOrder({ order })
          .then(() => transition({ view: 'order', personItems: null }));
      },
      refresh
    };
  }
});
