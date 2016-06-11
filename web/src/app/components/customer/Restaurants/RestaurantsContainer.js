import t from 'tcomb';
import Restaurants from './Restaurants';
import container from 'react-container';
import allQueries from 'queries';
import { Restaurant } from 'model';

export default container({ allQueries })(Restaurants, {
  connect: { restaurants: t.list(Restaurant) },
  queries: ['restaurants'],
  mapProps: ({ transition }) => ({
    onRestaurantClick: (restaurantId) => {
      transition({ restaurantId });
    }
  })
});
