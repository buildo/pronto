import container from 'container';
import uuid from 'node-uuid';
import CreateOrder from './CreateOrder';


export default container(CreateOrder, {
  connect: { },
  commands: ['doAddOrder'],
  mapProps: ({ transition, doAddOrder }) => ({
    onCreateOrderClick: () => {
      const orderId = uuid();
      return doAddOrder({ orderId })
        .then(() => transition({ view: 'order', orderId }));
    }
  })
});
