import { Query } from 'avenger';
import t from 'tcomb';
import * as API from 'API';
import { Restaurant } from 'model';

const queries = {

  user: Query({
    id: 'user',
    returnType: t.Any,
    fetch: API.getUser
  }),

  restaurants: Query({
    id: 'restaurants',
    returnType: t.list(Restaurant),
    fetch: ::Promise.resolve
  })

};

export default queries;
