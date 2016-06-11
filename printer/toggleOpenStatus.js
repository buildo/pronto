const { restaurant } = require('./firebase');

module.exports = () => {
  restaurant.once('value').then(data => {
    const newStatus = !data.val().open;
    restaurant.update({ open: newStatus });
  });
}
