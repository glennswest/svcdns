'use strict';

var chai = require('chai');
var expect = chai.expect;

var errors = require('../../lib/errors');

describe('Errors', function() {

  it('should expose an InvalidArguments error', function() {
    expect(new errors.InvalidArguments()).to.be.an.instanceOf(Error);
    expect(new errors.InvalidArguments())
      .to.match(/Invalid number of arguments/);
  });

  it('should expose an InvalidOption error', function() {
    expect(new errors.InvalidOption()).to.be.an.instanceOf(Error);
    expect(new errors.InvalidOption('key', 'value'))
      .to.match(/"value" is not a valid value for the "key" option/);
  });

  it('should expose a MustBeString error', function() {
    expect(new errors.MustBeString()).to.be.an.instanceOf(Error);
    expect(new errors.MustBeString('id'))
      .to.match(/"id" must be a string/);
  });

  it('should expose a MustBeFunction error', function() {
    expect(new errors.MustBeFunction()).to.be.an.instanceOf(Error);
    expect(new errors.MustBeFunction('id'))
      .to.match(/"id" must be a function/);
  });


  it('should expose a MustBeObject error', function() {
    expect(new errors.MustBeObject()).to.be.an.instanceOf(Error);
    expect(new errors.MustBeObject('id'))
      .to.match(/"id" must be an object/);
  });

});
