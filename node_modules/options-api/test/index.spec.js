'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../');

describe('optionsApi', function() {

  it('should be an object', function() {
    expect(optionsApi).to.be.an('object');
  });

  it('should have static methods', function() {
    expect(optionsApi).itself.to.respondTo('create');
    expect(optionsApi).itself.to.respondTo('mixin');
    expect(optionsApi).itself.to.respondTo('attach');
  });

});
