import { Query } from 'avenger';
import t from 'tcomb';
import * as API from 'API';
import { Menu, Order, Restaurant, SubmittedOrder } from 'model';

export const user = Query({
  id: 'user',
  returnType: t.Any,
  fetch: API.getUser
});

export const restaurants = Query({
  id: 'restaurants',
  returnType: t.list(Restaurant),
  fetch: () => API.getRestaurants().then(restaurants => console.log(restaurants)) //eslint-disable-line
});

export const restaurant = Query({
  id: 'restaurant',
  params: { restaurantId: t.String },
  returnType: Restaurant,
  fetch: ({ restaurantId }) => API.getRestaurant(restaurantId)
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
  fetch: () => fetch('https://pronto-9842a.firebaseio.com/restaurants/1.json')
    .then(resp => resp.json())
    .then(({ open }) => open)
});
