'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../../..');
var errors = require('../../../lib/errors');

describe('api.config()', function() {

  describe('setting multiple options', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should store multiple options', function() {
      var options = {
        'option1': 'value1',
        'option2': 'value2'
      };

      this.api.config(options);
      expect(this.api.get('option1')).to.equal('value1');
      expect(this.api.get('option2')).to.equal('value2');
    });

  });

  describe('called with invalid arguments', function() {

    before(function() {
      this.api = optionsApi.create();
    });

    it('should throw an error when called with no arguments', function() {
      expect(this.api.config.bind(this.api)).to.throw(errors.InvalidArguments);
    });

    it('should throw an error when called with non-object key', function() {
      expect(this.api.config.bind(this.api, 'invalid'))
        .to.throw(errors.MustBeObject);
    });

  });

});
