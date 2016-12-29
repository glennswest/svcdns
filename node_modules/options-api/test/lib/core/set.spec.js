'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../../..');
var errors = require('../../../lib/errors');

describe('api.set()', function() {

  describe('setting/getting options', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should store and allow retrieval of options', function() {
      this.api.set('key', 'value');
      expect(this.api.get('key')).to.equal('value');
    });

  });

  describe('validating options', function() {

    before(function() {
      this.api = optionsApi.create();
      this.api.validators({
        num: function(value) {
          return typeof value === 'number' && value > 10;
        },
        str: /.*\.js$/
      });
    });

    it('should store values validated with function', function() {
      this.api.set('num', 11);
      expect(this.api.get('num')).to.equal(11);
    });

    it('should throw error for value not validated with function', function() {
      expect(this.api.set.bind(this.api, 'num', 'bad'))
        .to.throw(errors.InvalidOption);
    });

    it('should store values validated with RegExp', function() {
      this.api.set('str', 'test.js');
      expect(this.api.get('str')).to.equal('test.js');
    });

    it('should throw error for value not valudated with function', function() {
      expect(this.api.set.bind(this.api, 'str', 'bad'))
        .to.throw(errors.InvalidOption);
    });

  });

  describe('called with invalid arguments', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should throw an error when called with no arguments', function() {
      expect(this.api.get.bind(this.api)).to.throw(errors.InvalidArguments);
      expect(this.api.set.bind(this.api)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error when called with non-string key', function() {
      expect(this.api.get.bind(this.api, 0)).to.throw(errors.MustBeString);
      expect(this.api.set.bind(this.api, 0, 0)).to.throw(errors.MustBeString);
    });

  });

});
