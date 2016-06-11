const fs = require('fs');

module.exports = ({ customerPhoneNumber, orderItems }) => new Promise((resolve, reject) => {
  const header = `\n\nPRONTO! un nuovo ordine in arrivo!\n\ntel:${customerPhoneNumber}\n\n`;
  const footer = "\n\n\n\x1C\xC0\x34"; //cut the paper

  const allItems = Object.keys(orderItems).map((name) =>{
    return orderItems[name];
  }).reduce((a, b) => {
    return a.concat(b);
  }, []);

  const itemsWithQuantity = allItems.reduce((a, b) => {
    if (a[b]) {a[b]++;} else {a[b] = 1;};
    return a;
  }, {});

  const body = Object.keys(itemsWithQuantity).reduce((a, itemName) => {
    a += `${itemsWithQuantity[itemName]}x ${itemName}\n`;
    return a;
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
