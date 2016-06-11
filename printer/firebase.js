const firebase = require('firebase');

const args = process.argv.slice(2);
const restaurantId = process.env.RESTAURANT_ID || args[0];

const config = {
  apiKey: 'AIzaSyCiymVPuijAp7xXODVFcSQCcND6uz9nIpY',
  authDomain: 'pronto-9842a.firebaseapp.com',
  databaseURL: 'https://pronto-9842a.firebaseio.com',
  storageBucket: 'pronto-9842a.appspot.com',
  serviceAccount: './pronto-a743dda5179f.json'
};

firebase.initializeApp(config);

const database = firebase.database();

module.exports.restaurant = database.ref(`restaurants/${restaurantId}`);
module.exports.orders = database.ref(`orders/${restaurantId}`);
