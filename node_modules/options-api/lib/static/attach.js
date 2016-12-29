'use strict';

var utils = require('agentia-utilities');
var errors = require('../errors');
var helpers = require('../helpers');

function attach(target, defaults, validators) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(target.prototype)) {
    throw new errors.MustBeObject('target.prototype');
  }

  this.mixin(target.prototype, defaults, validators);

  return target;
}

module.exports = attach;
