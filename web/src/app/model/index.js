import t from 'tcomb';

export const MenuItem = t.interface({
  name: t.String,
  price: t.maybe(t.Number),
  description: t.maybe(t.String)
}, { name: 'MenuItem', strict: true });

export const MenuGroup = t.interface({
  _id: t.String,
  description: t.String,
  items: t.maybe(t.list(MenuItem))
}, { name: 'MenuGroup', strict: true });

export const Menu = t.interface({
  description: t.maybe(t.String),
  groups: t.list(MenuGroup)
}, { name: 'Menu', strict: true });

export const Person = t.interface({
  name: t.String,
  items: t.list(t.String) // fk MenuItem.name
}, { name: 'Person', strict: true });

export const OrderStatus = t.enums.of(['submitted', 'pending'], 'OrderStatus');

export const Order = t.refinement(t.interface({
  id: t.String, // client session id
  // createdAt: t.Date,
  status: OrderStatus,
  referencePhoneNumber: t.maybe(t.String), // must be there before submit
  people: t.list(Person)
}, { strict: true }), order => {
  return order.status === OrderStatus('pending') || order.people.length > 0;
}, 'Order');

export const SubmittedOrder = t.refinement(Order, order => {
  return order.status === OrderStatus('submitted');
}, 'SubmittedOrder');

export const Restaurant = t.interface({
  _id: t.String,
  menu: Menu,
  name: t.String,
  description: t.maybe(t.String),
  telephone: t.String,
  address: t.String,
  // account: FirebasAccount,
  open: t.Boolean, // on/off
  maxPeopleNumber: t.Integer//,
  // orders: t.list(SubmittedOrder)
}, { name: 'Restaurant', strict: true });
