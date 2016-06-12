import Header from '../Page/Header';
// import t from 'tcomb';
import container from 'container';

const RestaurantsHeaderContainer = container(Header, {
  connect: {},
  queries: ['restaurant'],
  mapProps: ({ restaurant }) => ({
    title: restaurant.name,
    subtitle: restaurant.description,
    imgUrl: restaurant.imgUrl
  })
});

export default RestaurantsHeaderContainer;
