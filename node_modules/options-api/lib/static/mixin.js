'use strict';

var merge = require('merge-descriptors');
var utils = require('agentia-utilities');

var helpers = require('../helpers');
var errors = require('../errors');

var core = require('../core');

function init(instance, defaults, validators) {
  instance.__options = {
    defaults: {},
    validators: {},
    current: {}
  };

  instance.defaults(defaults);
  instance.validators(validators);
  instance.reset();
}

function mixin(instance, defaults, validators) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(instance)) {
    throw new errors.MustBeObject('instance');
  }

  merge(instance, core);
  init(instance, defaults, validators);

  return instance;
}

module.exports = mixin;
