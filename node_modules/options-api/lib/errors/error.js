'use strict';

var util = require('util');
var format = util.format;

function error(err, template, id, value) {
  var args = [];

  Error.call(err);
  Error.captureStackTrace(err, err.constructor);
  err.name = err.constructor.name;

  args.push(template);
  if (typeof id !== 'undefined') {
    args.push(id);
  }
  if (typeof value !== 'undefined') {
    args.push(value);
  }
  err.message = format.apply(null, args);
}

module.exports = error;
