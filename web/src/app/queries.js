import { Query } from 'avenger';
import t from 'tcomb';
import * as API from 'API';

const queries = {

  user: Query({
    id: 'user',
    returnType: t.Any,
    fetch: API.getUser
  })

};

export default queries;
