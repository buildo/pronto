const fs = require('fs');

const flatten = arr => arr.reduce((xs, x) => xs.concat(x));
const toArray = obj => Object.keys(obj).map(key => obj[key]);

module.exports = ({ referencePhoneNumber, peopleOrders }) => new Promise((resolve, reject) => {
  const header = `\n\nPRONTO! un nuovo ordine in arrivo!\n\ntel:${referencePhoneNumber}\n\n`;
  const footer = "\n\n\n\x1C\xC0\x34"; //cut the paper

  const allItems = flatten(toArray(peopleOrders).map(o => o.orderItems));

  const itemsWithQuantity = allItems.reduce((itemsWithQuantity, b) => {
    if (itemsWithQuantity[b]) {
      itemsWithQuantity[b]++;
    } else {
      itemsWithQuantity[b] = 1;
    };
    return itemsWithQuantity;
  }, {});

  const body = Object.keys(itemsWithQuantity).reduce((body, itemName) => {
    const quantity = itemsWithQuantity[itemName];
    return body + `${quantity}x ${itemName}\n`;
  }, "");

  const messageForPrinter = header + body + footer;

  fs.appendFile('/dev/usb/lp0', messageForPrinter, 'binary', err => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});
