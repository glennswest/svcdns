'use strict';

var chai = require('chai');
var expect = chai.expect;

var optionsApi = require('../../..');

describe('api.config()', function() {

  beforeEach(function() {
    this.api = optionsApi.create();
  });

  afterEach(function() {
    this.api = null;
  });

  it('should set options initial values', function() {
    var defaults = {
      'option1': 'value1',
      'option2': 'value2'
    };

    this.api.defaults(defaults);
    expect(this.api.get('option1')).to.equal('value1');
    expect(this.api.get('option2')).to.equal('value2');
  });

  it('should ignore invalid arguments', function() {
    var defaults = 'invalid defaults';

    expect(this.api.defaults(defaults)).to.not.throw;
  });

});
