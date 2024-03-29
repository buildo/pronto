import Profile from './Profile';
import container from 'container';

export default container(Profile, {
  queries: ['possiblyPendingRestaurant'],
  commands: ['updateRestaurantProfile']
});
