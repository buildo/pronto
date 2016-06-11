import { Query } from 'avenger';
import t from 'tcomb';
import * as API from 'API';
import { Menu, Order, Restaurant, SubmittedOrder } from 'model';

const restaurantFixture = Restaurant({
  _id: 'dmiojdeinuinfuiw',
  menu: {
    description: 'Primo e secondo 10€',
    groups: [{
      name: 'Primi',
      items: [{
        name: 'Spaghetti alla Carbonara',
        description: 'Con pancetta di qualità'
      }, {
        name: 'Simcoe',
        description: '200g di carne bovina'
      }]
    }, {
      name: 'Secondi',
      items: [{
        name: 'Zigoiner',
        description: 'Su palo di abete'
      }]
    }]
  },
  profile: {
    name: 'Blue Ginger',
    description: 'Asian food',
    telephone: '02 123432432',
    address: 'via Tortona 35, Milano'
  },
  open: true,
  maxPeoplePerOrder: 10,
  orders: []
});


export const user = Query({
  id: 'user',
  returnType: t.Any,
  fetch: API.getUser
});

export const restaurants = Query({
  id: 'restaurants',
  returnType: t.list(Restaurant),
  fetch: () => Promise.resolve([ restaurantFixture ])
});

export const restaurant = Query({
  id: 'restaurant',
  returnType: Restaurant,
  fetch: (/* { restaurantId }*/) => Promise.resolve(restaurantFixture)
});

export const menu = Query({
  id: 'menu',
  dependencies: {
    restaurant: {
      query: restaurant
    }
  },
  returnType: Menu,
  fetch: ({ restaurant }) => Promise.resolve(restaurant.menu)
});

export const orders = Query({
  id: 'orders',
  returnType: t.list(SubmittedOrder),
  fetch: () => Promise.resolve([{
    id: 'xxx',
    status: 'submitted',
    referencePhoneNumber: '3333599780',
    people: [{
      name: 'gio', items: []
    }]
  }].map(SubmittedOrder))
});

export const order = Query({
  id: 'order',
  returnType: Order,
  fetch: () => Promise.resolve(Order({
    id: 'deredede',
    status: 'pending',
    people: [{
      name: 'aski',
      items: [
        'Simcoe'
      ]
    }, {
      name: 'Gio',
      items: [
        'Spaghetti alla Carbonara'
      ]
    }]
  }))
});

export const open = Query({
  id: 'open',
  returnType: t.Boolean,
  fetch: () => Promise.resolve(JSON.parse(localStorage.getItem('open')))
});
