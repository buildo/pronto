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
  fetch: API.getRestaurants
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
  fetch: (/* { restaurantId }*/) => Promise.resolve({ // TODO use real API
    ...restaurantFixture.profile,
    maxPeoplePerOrder: restaurantFixture.maxPeoplePerOrder,
    imgUrl: 'https://volo-images.s3.amazonaws.com/production/it/list-hero.jpg'
  })
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
  fetch: () => API.isRestaurantOpen(0)
});
