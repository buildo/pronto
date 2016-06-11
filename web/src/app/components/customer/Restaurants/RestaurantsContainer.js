import Restaurants from './Restaurants';
import container from 'container';

export default container(Restaurants, {
  connect: {},
  queries: ['restaurants'],
  mapProps: ({ transition, restaurants }) => ({
    onRestaurantClick: (restaurantId) => () => {
      transition({ view: 'restaurant', restaurantId });
    },
    restaurants
  })
});
