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
  fetch: () => API.getRestaurants().filter(Restaurant.is)
});

export const restaurant = Query({
  id: 'restaurant',
  params: { restaurantId: t.String },
  returnType: Restaurant,
  fetch: ({ restaurantId }) => API.getRestaurant(restaurantId)
});

export const restaurantProfile = Query({
  id: 'restaurantProfile',
  returnType: t.Object, // TODO change
  fetch: (/* { restaurantId }*/) => API.getRestaurant(0)
});

export const menu = Query({
  id: 'menu',
  dependencies: {
    restaurant: { query: restaurant }
  },
  params: { restaurant: Restaurant },
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
  params: {
    restaurantId: t.String,
    orderId: t.String
  },
  fetch: ({ restaurantId, orderId }) => {
    return API.getRestaurantOrder(restaurantId, orderId).then(order => ({
      ...order,
      peopleOrders: (order.peopleOrders || []).filter(x => x)
    }));
  }
});

export const open = Query({
  id: 'open',
  returnType: t.Boolean,
  fetch: () => API.isRestaurantOpen(0)
});
