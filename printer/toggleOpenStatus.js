const { restaurant } = require('firebase');

module.exports = () => {
  restaurant.once('value').then(data => {
    const restaurant = data.val();
    const newStatus = !restaurant.open;
    restaurant.set({ open: newStatus });
  });
}
