'use strict';

var utils = require('agentia-utilities');
var errors = require('../errors');
var helpers = require('../helpers');

function unset(key) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isString(key)) {
    throw new errors.MustBeString('key');
  }

  delete this.__options.current[key];
  return this;
}

module.exports = unset;
