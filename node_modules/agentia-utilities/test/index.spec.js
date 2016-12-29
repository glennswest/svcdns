'use strict';

var chai = require('chai');
var expect = chai.expect;

var utils = require('../');

describe('agentia-utilities', function() {

  describe('.typeOf()', function() {

    it('should recognize arrays', function() {
      expect(utils.typeOf([])).to.equal('array');
      /*eslint-disable*/
      expect(utils.typeOf(new Array())).to.equal('array');
      /*eslint-enable*/
    });

    it('should recognize functions', function() {
      expect(utils.typeOf(function() {})).to.equal('function');
    });

    it('should recognize objects', function() {
      expect(utils.typeOf({})).to.equal('object');
    });

    it('should recognize dates', function() {
      expect(utils.typeOf(new Date())).to.equal('date');
    });

    it('should recognize strings', function() {
      expect(utils.typeOf(String(''))).to.equal('string');
      expect(utils.typeOf('')).to.equal('string');
    });

    it('should recognize numbers', function() {
      expect(utils.typeOf(Number(0))).to.equal('number');
      expect(utils.typeOf(0)).to.equal('number');
    });

    it('should recognize booleans', function() {
      expect(utils.typeOf(true)).to.equal('boolean');
      expect(utils.typeOf(false)).to.equal('boolean');
    });

    it('should recognize undefined', function() {
      expect(utils.typeOf(undefined)).to.equal('undefined');
    });

    it('should recognize nulls', function() {
      expect(utils.typeOf(null)).to.equal('null');
    });

  });

  describe('.isArray()', function() {

    it('shoud return true for array-literal args', function() {
      expect(utils.isArray([])).to.be.true;
    });

    it('shoud return true for array-object args', function() {
      /*eslint-disable*/
      expect(utils.isArray(new Array())).to.be.true;
      /*eslint-enable*/
    });

    it('shoud return false for non-array args', function() {
      expect(utils.isArray({})).to.be.false;
      expect(utils.isArray(0)).to.be.false;
      expect(utils.isArray(true)).to.be.false;
      expect(utils.isArray('string')).to.be.false;
      expect(utils.isArray(function() {})).to.be.false;
      expect(utils.isArray(new Date())).to.be.false;
      expect(utils.isArray(undefined)).to.be.false;
      expect(utils.isArray(/test/)).to.be.false;
    });

  });

  describe('.isFunction()', function() {

    it('shoud return true for function args', function() {
      expect(utils.isFunction(function() {})).to.be.true;
    });

    it('shoud return false for non-function args', function() {
      expect(utils.isFunction({})).to.be.false;
      expect(utils.isFunction(0)).to.be.false;
      expect(utils.isFunction(true)).to.be.false;
      expect(utils.isFunction('string')).to.be.false;
      expect(utils.isFunction([])).to.be.false;
      expect(utils.isFunction(new Date())).to.be.false;
      expect(utils.isFunction(undefined)).to.be.false;
      expect(utils.isFunction(/test/)).to.be.false;
    });

  });

  describe('.isObject()', function() {

    it('shoud return true for object args', function() {
      expect(utils.isObject({})).to.be.true;
    });

    it('shoud return false for non-object args', function() {
      expect(utils.isObject(0)).to.be.false;
      expect(utils.isObject(true)).to.be.false;
      expect(utils.isObject('string')).to.be.false;
      expect(utils.isObject([])).to.be.false;
      expect(utils.isObject(function() {})).to.be.false;
      expect(utils.isObject(new Date())).to.be.false;
      expect(utils.isObject(undefined)).to.be.false;
      expect(utils.isObject(/test/)).to.be.false;
    });

  });

  describe('.isDate()', function() {

    it('shoud return true for date args', function() {
      expect(utils.isDate(new Date())).to.be.true;
    });

    it('shoud return false for non-date args', function() {
      expect(utils.isDate(0)).to.be.false;
      expect(utils.isDate(true)).to.be.false;
      expect(utils.isDate('string')).to.be.false;
      expect(utils.isDate([])).to.be.false;
      expect(utils.isDate(function() {})).to.be.false;
      expect(utils.isDate({})).to.be.false;
      expect(utils.isDate(undefined)).to.be.false;
      expect(utils.isDate(/test/)).to.be.false;
    });

  });

  describe('.isString()', function() {

    it('shoud return true for strig args', function() {
      expect(utils.isString('string')).to.be.true;
    });

    it('shoud return false for non-string args', function() {
      expect(utils.isString(0)).to.be.false;
      expect(utils.isString(true)).to.be.false;
      expect(utils.isString([])).to.be.false;
      expect(utils.isString(function() {})).to.be.false;
      expect(utils.isString({})).to.be.false;
      expect(utils.isString(new Date())).to.be.false;
      expect(utils.isString(undefined)).to.be.false;
      expect(utils.isString(/test/)).to.be.false;
    });

  });

  describe('.isNumber()', function() {

    it('shoud return true for numberic args', function() {
      expect(utils.isNumber(0)).to.be.true;
    });

    it('shoud return false for non-numeric args', function() {
      expect(utils.isNumber({})).to.be.false;
      expect(utils.isNumber(true)).to.be.false;
      expect(utils.isNumber('string')).to.be.false;
      expect(utils.isNumber(function() {})).to.be.false;
      expect(utils.isNumber(new Date())).to.be.false;
      expect(utils.isNumber([])).to.be.false;
      expect(utils.isNumber(undefined)).to.be.false;
      expect(utils.isNumber(/test/)).to.be.false;
    });

  });

  describe('.isBoolean()', function() {

    it('shoud return true for boolean args', function() {
      var num = 1;

      expect(utils.isBoolean(true)).to.be.true;
      expect(utils.isBoolean(false)).to.be.true;
      expect(utils.isBoolean(num === 1)).to.be.true;
      expect(utils.isBoolean(num === 0)).to.be.true;
    });

    it('shoud return false for non-boolean args', function() {
      expect(utils.isBoolean({})).to.be.false;
      expect(utils.isBoolean('string')).to.be.false;
      expect(utils.isBoolean(function() {})).to.be.false;
      expect(utils.isBoolean(new Date())).to.be.false;
      expect(utils.isBoolean([])).to.be.false;
      expect(utils.isBoolean(0)).to.be.false;
      expect(utils.isBoolean(undefined)).to.be.false;
      expect(utils.isBoolean(/test/)).to.be.false;
    });

  });

  describe('.isUndefined()', function() {

    it('shoud return true for undefined args', function() {
      expect(utils.isUndefined(undefined)).to.be.true;
    });

    it('shoud return false for defined args', function() {
      expect(utils.isUndefined({})).to.be.false;
      expect(utils.isUndefined(true)).to.be.false;
      expect(utils.isUndefined('string')).to.be.false;
      expect(utils.isUndefined(function() {})).to.be.false;
      expect(utils.isUndefined(new Date())).to.be.false;
      expect(utils.isUndefined([])).to.be.false;
      expect(utils.isUndefined(0)).to.be.false;
      expect(utils.isUndefined(/test/)).to.be.false;
    });

  });

  describe('.isNull()', function() {

    it('shoud return true for null args', function() {
      expect(utils.isNull(null)).to.be.true;
    });

    it('shoud return false for non-null args', function() {
      expect(utils.isNull({})).to.be.false;
      expect(utils.isNull(true)).to.be.false;
      expect(utils.isNull('string')).to.be.false;
      expect(utils.isNull(function() {})).to.be.false;
      expect(utils.isNull(new Date())).to.be.false;
      expect(utils.isNull([])).to.be.false;
      expect(utils.isNull(0)).to.be.false;
      expect(utils.isNull(undefined)).to.be.false;
      expect(utils.isNull(/test/)).to.be.false;
    });

  });

  describe('.isRegExp()', function() {

    it('should have alias .isRegex()', function() {
      expect(utils.isRegExp).to.deep.equal(utils.isRegex);
    });

    it('shoud return true for RegExp args', function() {
      expect(utils.isRegExp(/test/)).to.be.true;
    });

    it('shoud return false for non-RegExp args', function() {
      expect(utils.isRegExp(null)).to.be.false;
      expect(utils.isRegExp({})).to.be.false;
      expect(utils.isRegExp(true)).to.be.false;
      expect(utils.isRegExp('string')).to.be.false;
      expect(utils.isRegExp(function() {})).to.be.false;
      expect(utils.isRegExp(new Date())).to.be.false;
      expect(utils.isRegExp([])).to.be.false;
      expect(utils.isRegExp(0)).to.be.false;
      expect(utils.isRegExp(undefined)).to.be.false;
    });

  });

  describe('.exists()', function() {

    it('shoud return true for non-null and non-undefined args', function() {
      expect(utils.exists({})).to.be.true;
      expect(utils.exists(true)).to.be.true;
      expect(utils.exists('string')).to.be.true;
      expect(utils.exists(function() {})).to.be.true;
      expect(utils.exists(new Date())).to.be.true;
      expect(utils.exists([])).to.be.true;
      expect(utils.exists(0)).to.be.true;
      expect(utils.exists(/test/)).to.be.true;
    });

    it('shoud return false for null and undefined args', function() {
      expect(utils.exists(null)).to.be.false;
      expect(utils.exists(undefined)).to.be.false;
    });

  });

  describe('.randomString()', function() {

    it('shoud return a 20 char string, when length not specified', function() {
      expect(utils.randomString().length).to.equal(20);
    });

    it('shoud return a string of specified length', function() {
      expect(utils.randomString(5).length).to.equal(5);
      expect(utils.randomString(10).length).to.equal(10);
      expect(utils.randomString(25).length).to.equal(25);
      expect(utils.randomString(50).length).to.equal(50);
      expect(utils.randomString(100).length).to.equal(100);
    });

    it('shoud return different string on successive calles', function() {
      expect(utils.randomString()).not.to.equal(utils.randomString());
      expect(utils.randomString()).not.to.equal(utils.randomString());
      expect(utils.randomString()).not.to.equal(utils.randomString());
      expect(utils.randomString()).not.to.equal(utils.randomString());
      expect(utils.randomString()).not.to.equal(utils.randomString());
    });

  });

  describe('.round()', function() {

    it('shoud round to nearest int, when decimals not specified', function () {
      expect(utils.round(1111.11111)).to.equal(1111);
    });

    it('shoud round to number of decimals, when positive', function () {
      expect(utils.round(1111.11111, 1)).to.equal(1111.1);
      expect(utils.round(1111.11111, 2)).to.equal(1111.11);
      expect(utils.round(1111.11111, 3)).to.equal(1111.111);
    });

    it('shoud round to a power of 10, when decimals is negative', function () {
      expect(utils.round(1111.11111, -1)).to.equal(1110);
      expect(utils.round(1111.11111, -2)).to.equal(1100);
      expect(utils.round(1111.11111, -3)).to.equal(1000);
    });

  });

  describe('.defineProp()', function() {
    var obj;

    beforeEach(function() {
      obj = {};
    });

    afterEach(function() {
      obj = null;
    });

    it('should create read/write prop, if getter/setter specified', function() {
      var getter = function() {
        return this._data;
      };
      var setter = function(data) {
        this._data = data;
      };

      utils.defineProp(obj, 'key', getter, setter);

      expect(obj).to.have.property('key');
      obj.key = 'value';
      expect(obj.key).to.equal('value');
    });

    it('should create read-only prop, when only getter specified', function() {
      obj._data = 0;
      var getter = function() {
        return this._data++;
      };

      utils.defineProp(obj, 'key', getter);

      expect(obj).to.have.property('key');
      expect(obj.key).to.equal(1);
      expect(obj.key).to.equal(2);
      expect(function() {
        obj.key = 3;
      }).to.throw;
    });

    it('should create read-only prop, when ony value is passed', function() {
      utils.defineProp(obj, 'key', 'value');

      expect(obj).to.have.property('key');
      expect(obj.key).to.equal('value');
      expect(function() {
        obj.key = 'another value';
      }).to.throw;
    });

  });

  describe('.getParamNames()', function() {

    it('should return an array of params', function() {
      var fn = function(a, b, c) {
        return a + b + c;
      };
      var params = utils.getParamNames(fn);

      expect(params).to.be.an('array');
      expect(params).to.have.length.of(3);
      expect(params).to.include('a');
      expect(params).to.include('b');
      expect(params).to.include('c');
    });

    it('should return an empty array, when function has no params', function() {
      var fn = function() {};
      var params = utils.getParamNames(fn);

      expect(params).to.be.an('array');
      expect(params).to.be.empty;
    });


    it('should return an empty array, when arg not function', function() {
      expect(utils.getParamNames({})).to.be.empty;
      expect(utils.getParamNames(true)).to.be.empty;
      expect(utils.getParamNames('string')).to.be.empty;
      expect(utils.getParamNames(new Date())).to.be.empty;
      expect(utils.getParamNames([])).to.be.empty;
      expect(utils.getParamNames(0)).to.be.empty;
      expect(utils.getParamNames(null)).to.be.empty;
      expect(utils.getParamNames(undefined)).to.be.empty;
    });

  });

  describe('.mergeOptions()', function() {

    it('should return merged options', function() {
      var defaults = { key1: 'value1' };
      var options = { key2: 'value2' };

      var merged = utils.mergeOptions(defaults, options);
      expect(merged).to.have.property('key1');
      expect(merged.key1).to.equal(defaults.key1);
      expect(merged).to.have.property('key2');
      expect(merged.key2).to.equal(options.key2);
    });

    it('should not override existing options', function() {
      var defaults = { key1: 'value1' };
      var options = { key1: 'value2' };

      var merged = utils.mergeOptions(defaults, options);
      expect(merged.key1).to.equal(options.key1);
    });

    it('should return options, when defaults is empty', function() {
      var options = { key1: 'value2' };
      var defaults = null;

      var merged = utils.mergeOptions(defaults, options);
      expect(merged).to.deep.equal(options);
    });

    it('should return defaults, when options is empty', function() {
      var options = null;
      var defaults = { key1: 'value2' };

      var merged = utils.mergeOptions(defaults, options);
      expect(merged).to.deep.equal(defaults);
    });

    it('should return empty obj, when options/defaults are empty', function() {
      var options = null;
      var defaults = null;

      var merged = utils.mergeOptions(defaults, options);
      expect(merged).to.deep.equal({});
    });

  });

});
