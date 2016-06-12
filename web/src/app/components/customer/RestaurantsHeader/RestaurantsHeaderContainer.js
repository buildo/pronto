import Header from '../Page/Header';
import container from 'container';

const RestaurantsHeaderContainer = container(Header, {
  mapProps: () => ({
    title: 'ACCOMODATI IL TUO PIATTO TI ASPETTA',
    subtitle: 'We are cooking up something great for you.',
    imgUrl: 'https://volo-images.s3.amazonaws.com/production/it/s3qv-hero.jpg?3'
  })
});

export default RestaurantsHeaderContainer;
