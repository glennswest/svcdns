'use strict';

var inherits = require('util').inherits;
var error = require('./error');

function InvalidArguments() {
  error(this, 'Invalid number of arguments');
}

inherits(InvalidArguments, Error);

module.exports = InvalidArguments;
