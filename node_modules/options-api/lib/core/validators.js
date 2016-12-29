'use strict';

var utils = require('agentia-utilities');

function validators(list) {
  if (utils.isObject(list)) {
    Object.keys(list).forEach(function(key) {
      this.__options.validators[key] = list[key];
    }.bind(this));
  }

  return this;
}

module.exports = validators;
