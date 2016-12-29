'use strict';

var inherits = require('util').inherits;
var error = require('./error');

function MustBeFunction(id) {
  error(this, '"%s" must be a function', id);
}

inherits(MustBeFunction, Error);

module.exports = MustBeFunction;
