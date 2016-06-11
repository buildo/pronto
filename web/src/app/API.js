const baseUrl = 'https://pronto-9842a.firebaseio.com/';

const PAPI = {
  get: (resource) => {
    return fetch(`${baseUrl}${resource}.json`).then(res => res.json());
  },

  put: (resource, body) => {
    return fetch(`${baseUrl}${resource}.json`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  },

  patch: (resource, body) => {
    return fetch(`${baseUrl}${resource}.json`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
};

export const getUser = () => {
  return fetch('http://uinames.com/api/').then(res => res.json()).then(res => {
    return res.name;
  });
};

export const getRestaurants = () => PAPI.get('restaurants');

export const getRestaurant = (rid) => PAPI.get(`restaurants/${rid}`);

export const putRestaurant = (rid, body) => {
  return PAPI.put(`restaurants/${rid}`, body);
};

export const getMenu = (rid) => {
  return PAPI.get(`restaurant/${rid}/menu`);
};

//TODO add orderBy
export const getOrders = (rid) => {
  return PAPI.get(`orders/${rid}`);
};

export const putOrder = (rid, oid, body) => {
  return PAPI.put(`orders/${rid}/${oid}`, body);
};

export const getRestaurantOrder = (rid, oid) => {
  return PAPI.get(`orders/${rid}/${oid}`);
};

export const putRestaurantOrderPerson = (rid, oid, uid, body) => {
  return PAPI.put(`orders/${rid}/${oid}/peopleOrders/{uid}`, body);
};

export const patchOrder = (rid, oid, body) => {
  return PAPI.patch(`orders/${rid}/${oid}`, body);
};
