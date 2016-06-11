import t from 'tcomb';

export const MenuItem = t.interface({
  name: t.String,
  description: t.maybe(t.String)
}, { name: 'MenuItem', strict: true });

export const MenuGroup = t.interface({
  name: t.String,
  items: t.list(MenuItem)
}, { name: 'MenuGroup', strict: true });

export const Menu = t.interface({
  description: t.maybe(t.String),
  groups: t.list(MenuGroup)
}, { name: 'Menu', strict: true });

export const RestaurantProfile = t.interface({
  name: t.String,
  description: t.maybe(t.String),
  telephone: t.String,
  address: t.String
}, { name: 'RestaurantProfile', strict: true });

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
  menu: Menu,
  profile: RestaurantProfile,
  // account: FirebasAccount,
  open: t.Boolean, // on/off
  maxPeoplePerOrder: t.Integer,
  orders: t.list(SubmittedOrder)
}, { name: 'Restaurant', strict: true });
