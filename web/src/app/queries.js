import { Query } from 'avenger';
import t from 'tcomb';
import * as API from 'API';
import { Restaurant, SubmittedOrder } from 'model';

export const user = Query({
  id: 'user',
  returnType: t.Any,
  fetch: API.getUser
});

export const restaurants = Query({
  id: 'restaurants',
  returnType: t.list(Restaurant),
  fetch: () => Promise.resolve([{
    menu: {
      description: 'Primo e secondo 10€',
      groups: [{
        name: 'Primi',
        items: [{
          name: 'Spaghetti alla Carbonara',
          description: 'Con pancetta di qualità'
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
  }].map(Restaurant))
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
