import container from 'container';
import Restaurant from './Restaurant';

export default container(Restaurant, {
  queries: ['restaurant']
});
