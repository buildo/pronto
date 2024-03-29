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
  },

  delete: (resource) => {
    return fetch(`${baseUrl}${resource}.json`, {
      method: 'DELETE'
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

export const isRestaurantOpen = rid => PAPI.get(`restaurants/${rid}/open`);
export const openRestaurant = rid => PAPI.patch(`restaurants/${rid}`, { open: true });
export const closeRestaurant = rid => PAPI.patch(`restaurants/${rid}`, { open: false });
export const updateRestaurant = (rid, patch) => PAPI.patch(`restaurants/${rid}`, patch);
export const updateMenu = (rid, value) => PAPI.put(`restaurants/${rid}/menu`, value);
const toListWith = key => (map = {}) => Object.keys(map).map(k => ({
  ...map[k], [key]: k
}));
const toListWithId = toListWith('id');
const toListWithName = toListWith('name');
export const getRestaurantOrders = rid => PAPI.get(`orders/${rid}`).then(toListWithId).then(
  orders => orders.map(order => ({
    ...order,
    peopleOrders: toListWithName(order.peopleOrders || {})
  }))
);
export const getRestaurantOrder = (rid, oid) => PAPI.get(`orders/${rid}/${oid}`).then(order => ({
  ...order,
  peopleOrders: toListWithName(order.peopleOrders || {}),
  id: oid
}));



//TODO add orderBy
export const getOrders = (rid) => {
  return PAPI.get(`orders/${rid}`);
};

export const putOrder = (rid, oid, body) => {
  return PAPI.put(`orders/${rid}/${oid}`, body);
};

export const putRestaurantOrderPerson = (rid, oid, uid, body) => {
  return PAPI.put(`orders/${rid}/${oid}/peopleOrders/${uid}`, body);
};

export const patchOrder = (rid, oid, body) => {
  return PAPI.patch(`orders/${rid}/${oid}`, body);
};

export const deletePersonOrderInRestaurantOrder = (rid, oid, uid) => {
  return PAPI.delete(`orders/${rid}/${oid}/peopleOrders/${uid}`);
};

export const putPerson = (rid, oid, body) => {
  return PAPI.patch(`orders/${rid}/${oid}/peopleOrders`, body);
};
