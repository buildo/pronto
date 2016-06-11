import container from 'container';
import Order from './Order';

export default container(Order, {
  queries: ['order']
});
