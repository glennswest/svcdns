'use strict';

var utils = require('agentia-utilities');
var errors = require('../errors');
var helpers = require('../helpers');

function config(options) {
  helpers.checkMinArgs(arguments, 1);

  if (!utils.isObject(options)) {
    throw new errors.MustBeObject('options');
  }

  Object.keys(options).forEach(function(key) {
    this.set(key, options[key]);
  }.bind(this));

  return this;
}

module.exports = config;
