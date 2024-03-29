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
    // TODO(gio): not sure about this, Restaurant.is should be enough?
    .then(restaurants => {
      const invalidRestaurants = restaurants.filter(r => !Restaurant.is(r));
      const closedRestaurants = restaurants.filter(r => Restaurant.is(r) && !r.open);

      invalidRestaurants.forEach((r) => {
        try {
          Restaurant(r);
        } catch (e) {
          console.error(e); // eslint-disable-line no-console
        }
      });


      console.log(`\nClosed restaurants:`); // eslint-disable-line no-console
      console.log(closedRestaurants); // eslint-disable-line no-console
      return restaurants.filter(r => Restaurant.is(r) && r.open); // open restaurants
    })
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

export const maybeOrder = Query({
  id: 'order',
  returnType: t.maybe(Order),
  params: { restaurantId: t.String, orderId: t.maybe(t.String) },
  fetch: ({ restaurantId, orderId }) => {
    return orderId ? API.getRestaurantOrder(restaurantId, orderId).then(order => ({
      ...order,
      peopleOrders: (order.peopleOrders || []).filter(x => x)
    })) : Promise.resolve(null);
  }
});
