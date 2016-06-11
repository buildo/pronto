// import t from 'tcomb';
import Orders from './Orders';
import container from 'react-container';
import allQueries from 'queries';

export default container({ allQueries })(Orders, {
  // queries: ['orders']
});