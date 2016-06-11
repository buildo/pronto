const args = process.argv.slice(2);
const restaurantId = process.env.RESTAURANT_ID || args[0];

if (!restaurantId) {
  console.log('Error! Missing restaurantId!');
  console.log('Usage: node index.js <restaurantId>');
  console.log('    or RESTAURANT_ID=<restaurantId> node index.js');
  process.exit();
}

const processOrder = require('./processOrder');
const { restaurant, orders } = require('./firebase');

// listen on orders changes
// (no need to check order added, because they're added in status == 'pending')
orders.on('child_changed', data => {
  const order = data.val();
  // if order has been submitted, process it
  if (order.status === 'submitted') {
    processOrder(order);
  }
});

// listen on 'open' status of restaurant
restaurant.on('child_changed', data => {
  if (data.key === 'open') {
    const open = data.val();
    updateLedStatus(open);
  }
});

function updateLedStatus(status) {
// TODO: actually update the led status
  const s = status ? 'ON' : 'OFF';
  console.log(`The led is now ${s}`);
}

console.log(`Welcome to restaurant ${restaurantId}`);
console.log('Listening for new orders...');
