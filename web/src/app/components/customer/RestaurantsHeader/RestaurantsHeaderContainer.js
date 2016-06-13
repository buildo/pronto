import Header from '../Page/Header';
import container from 'container';

const RestaurantsHeaderContainer = container(Header, {
  mapProps: () => ({
    title: 'ACCOMODATI IL TUO PIATTO TI ASPETTA',
    subtitle: 'We are cooking up something great for you.',
    imgUrl: 'https://s32.postimg.org/rl5ylkzph/group_2x.png'
  })
});

export default RestaurantsHeaderContainer;
