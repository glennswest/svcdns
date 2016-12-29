'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var optionsApi = require('../../../');
var errors = require('../../../lib/errors');

describe('optionsApi.attach()', function() {

  before(function() {
    sinon.stub(optionsApi, 'mixin');
  });

  after(function() {
    optionsApi.mixin.restore();
  });

  it('should attach optionsApi to a function\'s prototype', function() {
    var fn = function() {};
    optionsApi.attach(fn);
    expect(optionsApi.mixin).to.be.called.once;
    expect(optionsApi.mixin).to.have.been.calledWith(fn.prototype);
  });

  it('should throw an error, when called with no arguments', function() {
    expect(optionsApi.attach).to.throw(errors.InvalidArguments);
  });

  it('should throw an error, when target not an object', function() {
    expect(optionsApi.attach.bind(null, 'id')).to.throw(errors.MustBeObject);
  });

});
