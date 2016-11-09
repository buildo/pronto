const args = process.argv.slice(2);
const restaurantId = process.env.RESTAURANT_ID || args[0];
const Gpio = require('onoff').Gpio;

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
orders.orderByChild("status").equalTo("submitted").on('value', data => {
  const order = data.val();
  // if order didn't change from submitted to pending
  if (order) {
    processOrder(order);
  }
});

restaurant.once('value', data => {
  updateLedStatus(data.val().open);
});

// listen on 'open' status of restaurant
restaurant.on('child_changed', data => {
  if (data.key === 'open') {
    const open = data.val();
    updateLedStatus(open);
  }
});

const led = new Gpio(27, 'low');
function updateLedStatus(status) {
  led.write(status ? 1 : 0);
  const s = status ? 'ON' : 'OFF';
  console.log(`The led is now ${s}`);
}

const toggleOpenStatus = require('./toggleOpenStatus');
const button = new Gpio(17, 'in', 'falling', { debounceTimeout : 200 });
button.watch((err,value) => {
  toggleOpenStatus();
  console.log("open status toggled");
});

console.log(`Welcome to restaurant ${restaurantId}`);
console.log('Listening for new orders...');
