import { Query } from 'avenger';
import t from 'tcomb';
import * as API from 'API';
import { Menu, MenuGroup, MenuItem, Restaurant, RestaurantProfile } from 'model';

const queries = {

  user: Query({
    id: 'user',
    returnType: t.Any,
    fetch: API.getUser
  }),

  restaurants: Query({
    id: 'restaurants',
    returnType: t.list(Restaurant),
    fetch: () => Promise.resolve([
      Restaurant({
        menu: Menu({
          description: 'Primo e secondo 10€',
          groups: [
            MenuGroup({
              name: 'Primi',
              items: [
                MenuItem({
                  name: 'Spaghetti alla Carbonara',
                  description: 'Con pancetta di qualità'
                })
              ]
            })
          ]
        }),
        profile: RestaurantProfile({
          name: 'Blue Ginger',
          description: 'Asian food',
          telephone: '02 123432432',
          address: 'via Tortona 35, Milano'
        }),
        open: true,
        maxPeoplePerOrder: 10,
        orders: []
      })
    ])
  })

};

export default queries;
