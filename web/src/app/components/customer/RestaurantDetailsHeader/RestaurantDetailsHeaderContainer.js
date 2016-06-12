import container from 'container';
import RestaurantDetailsHeader from './RestaurantDetailsHeader';

export default container(RestaurantDetailsHeader, {
  connect: { },
  queries: ['restaurant'],
  mapProps: ({ restaurant }) => ({ restaurant })
});
