import container from 'container';
import uniqueId from 'lodash/uniqueId';
import CreateOrder from './CreateOrder';


export default container(CreateOrder, {
  connect: { },
  mapProps: ({ transition }) => ({
    onCreateOrderClick: () => transition({ view: 'order', orderId: uniqueId('order-') })
  })
});
