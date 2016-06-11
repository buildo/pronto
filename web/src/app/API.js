export const getUser = () => {
  return fetch('http://uinames.com/api/').then(res => res.json()).then(res => {
    return res.name;
  });
};
