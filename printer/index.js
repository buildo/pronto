const firebase = require('firebase');
const t = require('tcomb');
const printOrder = require('./printOrder');

const args = process.argv.slice(2);
const restaurantId = process.env.RESTAURANT_ID || args[0];

if (!restaurantId) {
  console.log('Error! Missing restaurantId!');
  console.log('Usage: node index.js <restaurantId>');
  console.log('    or RESTAURANT_ID=<restaurantId> node index.js');
  process.exit();
}

const config = {
  apiKey: 'AIzaSyCiymVPuijAp7xXODVFcSQCcND6uz9nIpY',
  authDomain: 'pronto-9842a.firebaseapp.com',
  databaseURL: 'https://pronto-9842a.firebaseio.com',
  storageBucket: 'pronto-9842a.appspot.com',
  serviceAccount: './pronto-a743dda5179f.json'
};

firebase.initializeApp(config);

const database = firebase.database();
const orders = database.ref(`orders/${restaurantId}`);
const led = database.ref('led');

// ------------------------------------------------------------------

const Person = t.interface({
  name: t.String,
  items: t.list(t.String) // fk MenuItem.name
}, { name: 'Person', strict: true });

const OrderStatus = t.enums.of(['submitted', 'pending'], 'OrderStatus');

const Order = t.refinement(t.interface({
  id: t.String, // client session id
  // createdAt: t.Date,
  status: OrderStatus,
  referencePhoneNumber: t.maybe(t.String), // must be there before submit
  people: t.list(Person)
}, { strict: true }), order => {
  return order.status === OrderStatus('pending') || order.people.length > 0;
}, 'Order');

orders.on('child_changed', data => {
  const order = data.val();
  // const order = Order(data.val());
  console.log(order);
  if (order.status === OrderStatus('submitted')) {
    processOrder(order);
  }
});

function processOrder(order) {
  console.log('printing order');
  console.log(JSON.stringify(order, null, 2));
  printOrder(order);
}

console.log(`Welcome to restaurant ${restaurantId}`);
console.log('Listening for new orders...');

function toggleLed() {
  led.once('value').then(data => {
    const currentLedStatus = data.val().status;
    const newLedStatus = !currentLedStatus;
    led.set({ status: newLedStatus }).then(() => updateLedStatus(newLedStatus));
  });
}

function updateLedStatus(status) {
  const s = status ? 'ON' : 'OFF';
  console.log(`The led is now ${s}`);
}
