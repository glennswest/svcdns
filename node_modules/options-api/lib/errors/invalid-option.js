'use strict';

var inherits = require('util').inherits;
var error = require('./error');

function InvalidOption(key, value) {
  error(this, '"%s" is not a valid value for the "%s" option', value, key);
}

inherits(InvalidOption, Error);

module.exports = InvalidOption;
