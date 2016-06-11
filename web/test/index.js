// called by mocha
const requireDir = require('require-dir');

require('babel-register')({
  only: [/src/, /tests/, /buildo-react-components/]
});

require('require-noop')({
  extensions: ['.css', '.scss']
});

requireDir('./tests', {
  recurse: true
});
