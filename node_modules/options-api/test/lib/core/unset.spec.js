'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../../..');
var errors = require('../../../lib/errors');

describe('api.unset()', function() {

  describe('unset options', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should remove an existing option', function() {
      this.api.set('key', 'value');
      this.api.unset('key');
      expect(this.api.get('key')).to.be.undefined;
    });

    it('should silently return when remiving non-existing options', function() {
      expect(this.api.unset('invalid')).to.not.throw;
    });

  });

  describe('called with invalid arguments', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should throw an error when called with no arguments', function() {
      expect(this.api.unset.bind(this.api)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error when called with non-string key', function() {
      expect(this.api.unset.bind(this.api, 0)).to.throw(errors.MustBeString);
    });

  });

});
