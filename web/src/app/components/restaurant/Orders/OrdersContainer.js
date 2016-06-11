import pick from 'lodash/fp/pick';
import Orders from './Orders';
import container from 'container';

export default container(Orders, {
  queries: ['orders']
}, pick(['orders']));