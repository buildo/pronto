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

export const Order = t.interface({
  id: t.String, // client session id
  // createdAt: t.Date,
  status: t.enums.of(['submitted', 'pending']),
  referencePhoneNumber: t.maybe(t.String), // must be there before submit
  people: t.list(Person)
}, { name: 'Order', strict: true });

export const Restaurant = t.interface({
  menu: Menu,
  profile: RestaurantProfile,
  // account: FirebasAccount,
  open: t.Boolean, // on/off
  maxPeoplePerOrder: t.Integer,
  orders: t.list(Order)
}, { name: 'Restaurant', strict: true });
