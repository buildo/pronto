const map = v => Object.keys(v).map(_id => ({ ...v[_id], _id }));

const baseUrl = 'https://pronto-9842a.firebaseio.com/';

const ProntoAPI = {
  get: (resource) => {
    return fetch(`${baseUrl}${resource}.json`).then(res => res.json());
  }
};

export const getUser = () => {
  return fetch('http://uinames.com/api/').then(res => res.json()).then(res => {
    return res.name;
  });
};

export const getRestaurants = () => {
  return ProntoAPI.get('restaurants').then(map).then(restaurants => restaurants.map(r => ({
    ...r, menu: { ...r.menu, groups: map(r.menu.groups) }
  })));
};

export const getRestaurant = (rid) => {
  return ProntoAPI.get(`restaurants/${rid}`).then(r => ({
    ...r, _id: rid, menu: { ...r.menu, groups: map(r.menu.groups) }
  }));
};
