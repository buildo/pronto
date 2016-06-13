import Header from '../Page/Header';
import loadingDecorator from 'noLoading';
import container from 'container';

const RestaurantsHeaderContainer = container(Header, {
  connect: {},
  loadingDecorator,
  queries: ['restaurant'],
  mapProps: ({ restaurant }) => ({
    title: restaurant.name,
    subtitle: restaurant.description,
    imgUrl: restaurant.imgUrl
  })
});

export default RestaurantsHeaderContainer;
