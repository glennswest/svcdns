'use strict';

var utils = require('agentia-utilities');
var errors = require('../errors');
var helpers = require('../helpers');

function validate(validators, key, value) {
  var validator;

  validator = validators[key];
  if (utils.isFunction(validator)) {
    return validator.call(null, value);
  }

  if (utils.isRegExp(validator)) {
    return validator.test(value);
  }

  return true;
}

function set(key, value) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isString(key)) {
    throw new errors.MustBeString('key');
  }

  if (arguments.length === 1) {
    return this.__options.current[key];
  }

  if (!validate(this.__options.validators, key, value)) {
    throw new errors.InvalidOption(key, value);
  }

  this.__options.current[key] = value;

  return this;
}

module.exports = set;
