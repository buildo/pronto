import { Query } from 'avenger';
import t from 'tcomb';
import * as API from 'API';
import { Menu, Order, Restaurant, PendingRestaurant, SubmittedOrder } from 'model';

export const user = Query({
  id: 'user',
  returnType: t.Any,
  fetch: API.getUser
});

export const restaurants = Query({
  id: 'restaurants',
  returnType: t.list(Restaurant),
  fetch: () => API.getRestaurants()
    .then(restaurants => restaurants.filter(r => r && Restaurant.is(r)))
});

export const restaurant = Query({
  id: 'restaurant',
  params: { restaurantId: t.String },
  returnType: Restaurant,
  fetch: ({ restaurantId }) => API.getRestaurant(restaurantId)
});

export const possiblyPendingRestaurant = Query({
  id: 'possiblyPendingRestaurant',
  params: { restaurantId: t.String },
  returnType: PendingRestaurant,
  fetch: ({ restaurantId }) => API.getRestaurant(restaurantId)
});

export const menu = Query({
  id: 'menu',
  dependencies: {
    restaurant: { query: restaurant }
  },
  params: { restaurant: Restaurant },
  returnType: t.maybe(Menu),
  fetch: ({ restaurant }) => Promise.resolve(restaurant.menu)
});

export const possiblyEmptyMenu = Query({
  id: 'possiblyEmptyMenu',
  dependencies: {
    restaurant: { query: restaurant }
  },
  params: { restaurant: PendingRestaurant },
  returnType: t.maybe(Menu),
  fetch: ({ restaurant }) => Promise.resolve(restaurant.menu || null)
});

export const restaurantOrders = Query({
  id: 'restaurantOrders',
  params: { restaurantId: t.String },
  returnType: t.list(SubmittedOrder),
  fetch: ({ restaurantId }) => API.getRestaurantOrders(restaurantId).then(
    orders => orders.filter(SubmittedOrder.is)
  )
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
  params: { restaurantId: t.String },
  returnType: t.Boolean,
  fetch: ({ restaurantId }) => API.isRestaurantOpen(restaurantId)
});
