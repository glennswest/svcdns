'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var optionsApi = require('../../../');

describe('optionsApi.create()', function() {

  before(function() {
    sinon.stub(optionsApi, 'mixin');
  });

  after(function() {
    optionsApi.mixin.restore();
  });

  it('should attach optionsApi to an empty object', function() {
    optionsApi.create();
    expect(optionsApi.mixin).to.be.called.once;
    expect(optionsApi.mixin).to.have.been.calledWith(sinon.match({}));
  });

});
