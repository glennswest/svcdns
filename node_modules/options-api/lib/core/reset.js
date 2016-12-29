'use strict';

var clone = require('clone');

function reset() {
  this.__options.current = clone(this.__options.defaults);
  return this;
}

module.exports = reset;
