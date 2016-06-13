import container from 'container';
import loadingDecorator from 'noLoading';
import RestaurantDetailsHeader from './RestaurantDetailsHeader';

export default container(RestaurantDetailsHeader, {
  connect: { },
  loadingDecorator,
  queries: ['restaurant'],
  mapProps: ({ restaurant }) => ({ restaurant })
});
