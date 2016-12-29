'use strict';

var chai = require('chai');
var expect = chai.expect;

var errors = require('../../lib/errors');
var helpers = require('../../lib/helpers');

describe('Helpers', function() {

  describe('.checkMinArgs()', function() {

    it('should return silently if check succedes', function() {
      expect(helpers.checkMinArgs([1, 2, 3], 3)).to.not.throw;
    });

    it('should throw an error if check fails', function() {
      expect(helpers.checkMinArgs.bind(helpers, [1, 2], 3))
        .to.throw(errors.InvalidArguments);
    });

  });

});
