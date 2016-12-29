'use strict';

function typeOf(value) {
  return Object.prototype.toString.call(value)
    .replace(/^\[.+\s(.+?)\]$/, '$1')
    .toLowerCase();
}

function isArray(arg) {
  return Array.isArray(arg);
}

function isFunction(arg) {
  return (typeOf(arg) === 'function');
}

function isObject(arg) {
  return (typeOf(arg) === 'object');
}

function isDate(arg) {
  return (typeOf(arg) === 'date');
}

function isString(arg) {
  return (typeOf(arg) === 'string');
}

function isNumber(arg) {
  return (typeOf(arg) === 'number');
}

function isBoolean(arg) {
  return (typeOf(arg) === 'boolean');
}

function isUndefined(arg) {
  return (typeOf(arg) === 'undefined');
}

function isNull(arg) {
  return (typeOf(arg) === 'null');
}

function isRegExp(arg) {
  return (typeOf(arg) === 'regexp');
}

function exists(arg) {
  return !isUndefined(arg) && !isNull(arg);
}

function randomString(length, characters) {
  var string = '';

  length = !length ? 20 : length;
  characters = characters ||
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

  for (var i = 0; i < length; i++) {
    string += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return string;
}

function round(num, exp) {
  exp = !exp ? 0 : exp;
  var multiplier = Math.pow(10, exp);
  return Math.floor(num * multiplier) / multiplier;
}

function defineProp(obj, name, getter, setter) {
  var options = {
    configurable: true,
    enumerable: true
  };

  if (isFunction(getter)) {
    options.get = getter;
  }

  if (!isFunction(getter) && exists(getter)) {
    options.value = getter;
  }

  if (isFunction(setter)) {
    options.set = setter;
  }

  Object.defineProperty(obj, name, options);
}

function getParamNames(fn) {
  var params;

  if (isFunction(fn)) {
    fn = fn.toString();
    params = fn.slice(fn.indexOf('(') + 1, fn.indexOf(')')).match(/([^\s,]+)/g);
  }
  return isArray(params) ? params : [];
}

function mergeOptions(defaults, options) {
  if (!isObject(defaults)) {
    defaults = {};
  }

  if (!isObject(options)) {
    options = {};
  }

  Object.keys(defaults).forEach(function(key) {
    if (!options.hasOwnProperty(key)) {
      options[key] = defaults[key];
    }
  });

  return options;
}

module.exports = {
  typeOf: typeOf,
  isArray: isArray,
  isFunction: isFunction,
  isObject: isObject,
  isDate: isDate,
  isString: isString,
  isNumber: isNumber,
  isBoolean: isBoolean,
  isUndefined: isUndefined,
  isNull: isNull,
  isRegExp: isRegExp,
  isRegex: isRegExp,
  exists: exists,
  randomString: randomString,
  round: round,
  defineProp: defineProp,
  getParamNames: getParamNames,
  mergeOptions: mergeOptions
};
