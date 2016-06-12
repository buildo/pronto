import t from 'tcomb';

export const MenuItem = t.interface({
  shortName: t.String,
  name: t.String,
  price: t.maybe(t.Number),
  description: t.maybe(t.String)
}, { name: 'MenuItem', strict: true });

export const MenuGroup = t.interface({
  description: t.String,
  items: t.maybe(t.list(MenuItem))
}, { name: 'MenuGroup', strict: true });

export const Menu = t.interface({
  description: t.maybe(t.String),
  groups: t.maybe(t.list(MenuGroup))
}, { name: 'Menu', strict: true });

export const Person = t.interface({
  name: t.String,
  items: t.list(t.String) // fk MenuItem.name
}, { name: 'Person', strict: true });

export const OrderStatus = t.enums.of(['submitted', 'pending'], 'OrderStatus');

export const Order = t.refinement(t.interface({
  // id: t.String, // client session id
  createdAt: t.maybe(t.Number),
  customerPhoneNumber: t.maybe(t.String),
  tableName: t.maybe(t.String),
  status: OrderStatus,
  peopleOrders: t.list(Person)
}, { strict: true }), order => {
  return order.status === OrderStatus('pending') || order.peopleOrders.length > 0;
}, 'Order');

export const SubmittedOrder = t.refinement(Order, order => {
  return order.status === OrderStatus('submitted');
}, 'SubmittedOrder');

export const Restaurant = t.interface({
  menu: Menu,
  name: t.String,
  description: t.maybe(t.String),
  telephone: t.String,
  address: t.String,
  // account: FirebasAccount,
  open: t.Boolean, // on/off
  maxPeopleNumber: t.Integer,
  imgUrl: t.maybe(t.String)//,
  // orders: t.list(SubmittedOrder)
}, { name: 'Restaurant', strict: true });
