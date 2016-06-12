import Restaurant from './Restaurant';
import container from 'container';

export default container(Restaurant, {
  connect: {},
  queries: ['order'],
  mapProps: ({ order }) => ({ pending: order.status === 'pending' })
});
