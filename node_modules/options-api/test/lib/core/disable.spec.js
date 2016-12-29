'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../../..');
var errors = require('../../../lib/errors');

describe('api.disable()', function() {

  describe('disabling an option', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should store and allow retrieval of options', function() {
      this.api.disable('key');
      expect(this.api.get('key')).to.be.false;
    });

  });

  describe('error conditions', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should throw an error when called with no arguments', function() {
      expect(this.api.disable.bind(this.api))
        .to.throw(errors.MustBeString);
    });

    it('should throw an error when called with non-string key', function() {
      expect(this.api.disable.bind(this.api, 0))
        .to.throw(errors.MustBeString);
    });

    it('should throw an error when validation prevents boolean', function() {
      this.api.validators({
        num: function(value) {
          return typeof value === 'number';
        }
      });
      expect(this.api.disable.bind(this.api, 'num'))
        .to.throw(errors.InvalidOption);
    });

  });

});
