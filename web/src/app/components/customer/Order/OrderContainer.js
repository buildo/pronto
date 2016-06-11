import container from 'container';
import Order from './Order';

export default container(Order, {
  connect: { },
  commands: ['doAddPersonToOrder', 'doDeletePersonFromOrder'],
  queries: ['order'],
  mapProps: ({ transition, doAddPersonToOrder, doDeletePersonFromOrder, order }) => ({
    order,
    onAddPersonClick: (personName) => doAddPersonToOrder(personName),
    onPersonClick: (personName) => () => {
      transition({ view: 'personOrder', personName });
    },
    onDeletePersonClick: (personName) => doDeletePersonFromOrder(personName)
  })
});
