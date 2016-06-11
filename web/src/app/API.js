import map from 'lodash/map';

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
  return ProntoAPI.get('restaurants').then(map);
};
