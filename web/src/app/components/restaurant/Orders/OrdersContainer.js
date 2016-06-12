import pick from 'lodash/fp/pick';
import Orders from './Orders';
import container from 'container';
import t from 'tcomb';

export default container(Orders, {
  queries: ['restaurantOrders'],
  connect: { selectedOrderId: t.maybe(t.String) }
}, pick(['restaurantOrders']));