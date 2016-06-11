import Restaurants from './Restaurants';
import container from 'container';
import loadingDecorator from 'loading';

export default container(Restaurants, {
  connect: { },
  queries: ['restaurants'],
  loadingDecorator,
  mapProps: ({ transition, restaurants }) => ({
    onRestaurantClick: (restaurantId) => () => {
      transition({ view: 'restaurant', restaurantId });
    },
    restaurants
  })
});
